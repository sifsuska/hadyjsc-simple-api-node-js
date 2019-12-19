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

}

module.exports = Controller;