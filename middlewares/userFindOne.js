const { Op } = require('sequelize');
const { users, roles } = require('../models');

module.exports = (req, res, next) => {
  const { username } = req.body;
  const { decoded, params } = req;
  if (!Object.keys(params).length) {
    if (!decoded) {
      users
        .findOne({
          where: {
            [Op.or]: [{ username }, { email: username }]
          },
          include: [{ model: roles, as: 'rolesId' }]
        })
        .then(user => {
          req.user = user;
          next();
        })
        .catch(err => {
          next(err);
        })
    } else {
      users
        .findOne({
          where: {
            [Op.or]: [{ username: decoded.username }, { email: decoded.username }]
          },          
          include: [{ model: roles, as: 'rolesId' }]
        })
        .then(user => {
          req.user = user;
          next();
        })
        .catch(err => {
          next(err);
        })
    }
  } else {
    users
      .findOne({
        where: {
          username: params.username
        },          
        include: [{ model: roles, as: 'rolesId' }]
      })
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => {
        next(err);
      })
  }
}