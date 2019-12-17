'use strict';

module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('roles', {
    scope: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'required'
        },
        isUnique: function (scope) {
          return roles.findOne({
            where: {
              scope
            }
          })
          .then(data => {
            if (data) {
              throw new Error('scope not available');
            }
          })
          .catch(err => {
            throw err;
          })
        }
      }
    },
    description: {
      type: DataTypes.STRING
    },
    created_at: {
      type: DataTypes.INTEGER
    },
    created_by: {
      type: DataTypes.INTEGER
    },
    updated_at: {
      type: DataTypes.INTEGER
    },
    updated_by: {
      type: DataTypes.INTEGER
    },
    deleted_at: {
      type: DataTypes.INTEGER
    },
    deleted_by: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    hooks: {
    }
  });
  roles.associate = function(models) {
    roles.hasMany(models.users, {
      as: 'usersId'
    });
  };
  return roles;
};