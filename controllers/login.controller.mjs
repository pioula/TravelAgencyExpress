import { Transaction } from "sequelize";
import Sequelize from "sequelize";

import { validationResult } from "express-validator";

import db, { sequelize } from "../services/database.mjs";

const loginController = {
  // localhost:port/registration
  get: (req, res, next) =>  {
    res.status(200).render(
      'login',
      { errors: [] },
    );
  },
  post: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).render(
        'login',
        { errors: errors.array() },
      );
    }
    else {
      res.status(200).render('login_success');
    }
  }
}
export default loginController;
