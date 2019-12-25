const { Op } = require('sequelize');

const { users, roles } = require('../models');
const { bcrypt, jwt, mailer, generator } = require('../helpers');

class Controller {
  static register(req, res, next) {
    const { email, fullname, role  } = req.body;
    const { password , auth_key, verification_token } = generator;
    const passwordVar = password();
    const username = generator.username(email);
    if (email && fullname) {
      users.create({
        email,
        username,
        password: passwordVar,
        fullname,
        verification_token: verification_token,
        role,
        status: 1,
        created_at: Math.round(new Date().getTime()/1000)
      })
      .then(newUser => {
        const mailOptionsNotifier = {
          to: email,
          subject: `Welcome to ${process.env.SYSTEM_TITLE}`,
          html: `<p>You have been registered to be a user of the system</p><p>Details:
                <br /><span>Email: ${email}</span><br /><span>Username: ${username}</span>
                <br /><span>Password: ${passwordVar}</span></p>
                <p>Please verify your email address so we know that it's really you! 
                <br> 
                <a href="${process.env.API_DEPLOY}/register/verify/email/${email}/token/${newUser.verification_token}" style="background-color: #008CBA;border: none;border-radius:8px;color: white;padding: 12px 28px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;">Verify my email address</a></p>
                <p>Please do not reply this email as it is automatically generated from our system.</p><p><a href="https://www.java-sc.com">Powered by JSC Dev.</a></p>`
        };
        mailer(mailOptionsNotifier);
        res.status(201).json({ message: 'Thank you for signing up, you must verify your email address.', newUser });
      })
      .catch(err => {
        next(err);
      })
    }else {
      res.status(201).json({ message: 'Fill up all form.' });
    }
  }

  static register_verify(req, res, next){
    const {token, email} = req.params;
    users.findOne({
      where: {
         verification_token : token ,  
         email: email,
         status : 1
      },
    })
    .then(result => {
        users.update({
          status: 2,
          updated_at: Math.round(new Date().getTime()/1000),
          updated_by: result.id,
          verification_token : null
        },{
          where : {id : result.id }
        }).then(updated => {
          res.status(201).json({
            message: 'Your account successfully for activate, you can log in to application',
            updated
          });
        });
    }).catch(err => {
        next(err);
    });
  }

  static login(req, res, next) {
    const { password } = req.body;
    const { user } = req;

    if (!user) {
      const err = {
        status: 400,
        message: 'invalid username / email / password'
      }
      next(err);
    } else {
      let valid = bcrypt.compare(password, user.password);
      if (!valid) {
        const err = {
          status: 400,
          message: 'invalid email / username / password'
        }
        next(err);
      } else {
        const { login_pin } = generator;
        var rule = new schedule.RecurrenceRule();
        rule.minute = 5;
        
        var j = schedule.scheduleJob(rule, function(){
           user.update({
            login_pin: null
          })
        });

        user.login_pin = login_pin();
        user
          .save()
          .then(updated => {
            const mailOptions = {
              to: updated.email,
              subject: `${process.env.SYSTEM_TITLE} - Verification PIN`,
              html: `<p>Use following pin to verify it is you</p><br/><p>${updated.login_pin}</p><br/><p>Remember: pin will expire in <strong>5 minutes</strong>.</p><p>Please do not reply this email as it is automatically generated from our system.</p><p>Powered by E-life Solutions.</p>`
            };
            return mailer(mailOptions);
          })
          .then(info => {
            res.status(200).json({ message: 'login success, pin sent to your registered email, verify it is you', info });
          })
          .catch(err => {
            next(err);
          })
      }
    }
  }

  static verify(req, res, next) {
    const { username, login_pin } = req.body;
    const { user } = req;

    if (!login_pin) {
      const err = {
        status: 400,
        message: 'one of input is undefined'
      }
      next(err);
    } else {
      if (!user) {
        const err = {
          status: 400,
          message: 'invalid username / email / pin'
        }
        next(err);
      } else {
        if (!user.login_pin) {
          const err = {
            status: 400,
            message: 'session pin expired'
          }
          next(err);
        } else {
          let token = null;
          users
            .findOne({
              where: {
                [Op.or]: [{ username }, { email: username }],
                login_pin
              },
              include: [{ model: roles, as: 'rolesId' }]
            })
            .then(foundUser => {
              if (!foundUser) {
                const err = {
                  status: 400,
                  message: 'invalid email / username / pin'
                }
                next(err);
              } else {
                const { id, email, username, password, Role } = foundUser;
                token = jwt.sign({
                  id,
                  email,
                  username,
                  password,
                  Role: roles.scope
                })
                user.login_pin = null;
                user.auth_key = token;
                user.verification_token = null;
                return user.save()
              }
            }).catch(err => {
              next(err);
            })
        }
      }
    }
  }

  static decode(req, res, next) {
    const { decoded } = req;
    res.status(200).json({ message: 'token decoded', decoded });
  }

}

module.exports = Controller;