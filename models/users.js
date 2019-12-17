'use strict';
const bcrypt = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'required'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'required'
        },
        isUnique: function (email) {
          return users.findOne({
            where: {
              email
            }
          })
          .then(data => {
            if (data) {
              throw new Error('username not available');
            }
          })
          .catch(err => {
            throw err;
          })
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'required'
        },
        isUnique: function (email) {
          return users.findOne({
            where: {
              email
            }
          })
          .then(data => {
            if (data) {
              throw new Error('email has been registered');
            }
          })
          .catch(err => {
            throw err;
          })
        },
        valid: function (email, next) {
          const valid = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
          if (!valid) {
            const err = {
              name: 'SequelizeValidationError',
              message: 'email is not valid',
            }
            return next(err)
          } else {
            return next();
          }
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'required'
        }
      }
    },
    auth_key: {
      type: DataTypes.STRING
    },
    verification_token: {
      type: DataTypes.STRING
    },
    password_reset_token: {
      type: DataTypes.STRING
    },
    role_id: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.INTEGER
    },
    login_pin: {
      type: DataTypes.STRING
    },
    created_at: {
      type : DataTypes.INTEGER
    },
    created_by: {
      type : DataTypes.INTEGER
    },
    updated_at: {
      type : DataTypes.INTEGER
    },
    updated_by: {
      type : DataTypes.INTEGER
    },
    deleted_at: {
      type : DataTypes.INTEGER
    },
    deleted_by: {
      type : DataTypes.INTEGER
    }
  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    hooks: {
      beforeCreate(users, options) {
        let hash = bcrypt.hash(users.password);
        users.password = hash;
      },
      beforeUpdate(users, options) {
        if (options.fields && options.fields.indexOf('password') !== -1) {
          let hash = bcrypt.hash(users.password);
          users.password = hash;
        }
      }
    }
  });
  users.associate = function(models) {
    // associations can be defined here
    users.belongsTo(models.roles, { 
      foreignKey: 'role_id',
      as: 'rolesId' 
    });
  };
  return users;
};