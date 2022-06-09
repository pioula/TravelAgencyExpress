import express from 'express';

import { body } from 'express-validator';

import registrationController from '../controllers/registration.controller.mjs';

const registrationRouter = express.Router();

registrationRouter.get('/', registrationController.get);
registrationRouter.post('/',
  body('name').custom((value) => {
    return value.length > 0 && value.length <= 40;
  })
  .withMessage('Must be no empty and shorter than 41 characters'),
  body('lastName').custom((value) => {
    return value.length > 0 && value.length <= 40;
  })
  .withMessage('Must be no empty and shorter than 41 characters'),
  body('email').isEmail()
  .withMessage('Invalid email'),
  body('password').custom((value) => {
    return value.length > 0 && value.length <= 40;
  })
  .withMessage('Password cannot be empty'),
 registrationController.post);

export default registrationRouter;
