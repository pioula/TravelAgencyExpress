import { Transaction } from "sequelize";
import Sequelize from "sequelize";
import bcrypt from 'bcrypt';
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
    let errors = validationResult(req).array();

    let isOk = true;
    if (errors.length > 0) {
      isOk = false;
    } else {
      let user = await db.User.findAll({
        where: {
          email: req.body.email
        }
      });
      if (user.length === 0) {
        errors.push({param: 'Mail', msg: 'Not found'});
        isOk = false;
      } else {
        await bcrypt.compare(req.body.password, user[0].dataValues.password)
          .then(function(result) {
            isOk = result;
            if (!isOk)
              errors.push({param: 'password', msg: 'Wrong Password!'});
        });
      }
    }
    
console.log(errors);
    if (isOk) {
      res.status(200).render('login_success');
    } else {
      res.status(400).render(
        'login',
        { errors: errors },
      );
    }
  }
}
export default loginController;
