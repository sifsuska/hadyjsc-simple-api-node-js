const { Op } = require('sequelize');

const { roles } = require('../models');

class Controller {
	static list(req, res, next){
		roles.findAll().then(result => {
			res.status(201).json({result});
		}).catch(error => {
			next(error);
		})
	}

	static create(req, res, next){
		const { scope, description  } = req.body;
		roles.create({
			scope: scope,
			description : description,
			created_at: Math.round(new Date().getTime()/1000)
		}).then(result => {
			res.status(201).json({ message: 'New role is created', result });
		}).catch(error => {
			next(error);
		});
	}
}

module.exports = Controller;