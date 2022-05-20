import express from 'express';

import { body } from 'express-validator';

import bookController from '../controllers/book.controller.mjs';

const bookRouter = express.Router();

bookRouter.get('/:trip_id(\\d+)', bookController.get);
bookRouter.post('/:trip_id(\\d+)', 
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
    body('tickets').custom(value => value > 0)
    .withMessage('Must be greater than 0'),
    bookController.post);

export default bookRouter;
