import express from 'express';

import { body } from 'express-validator';

import loginController from '../controllers/login.controller.mjs';

const loginRouter = express.Router();

loginRouter.get('/', loginController.get);
loginRouter.post('/',
  body('email').isEmail()
  .withMessage('Invalid email'),
  body('password').custom((value) => {
    return value.length > 0 && value.length <= 40;
  })
  .withMessage('Password cannot be empty'),
 loginController.post);

export default loginRouter;
