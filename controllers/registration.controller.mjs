import { Transaction } from "sequelize";
import Sequelize from "sequelize";

import { validationResult } from "express-validator";

import db, { sequelize } from "../services/database.mjs";

const registrationController = {
  // localhost:port/registration
  get: async (req, res, next) =>  {
    await db.User.findAll()
      .then((users) => {
        res.status(200).render(
          'registration',
          { errors: [], users: users.map((user) => user.dataValues) },
        );
      });
  },
  post: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      await db.User.findAll()
      .then((users) => {
        res.status(400).render(
          'registration',
          { errors: errors.array(), users: users.map((user) => user.dataValues) },
        );
      });
    }
    else {
      await db.User.create({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      });
      res.status(200).render('login_success');
    }
  }
}
export default registrationController;
