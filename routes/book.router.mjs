import express from 'express';

import { body } from 'express-validator';

import bookController from '../controllers/book.controller.mjs';

const bookRouter = express.Router();

bookRouter.get('/:trip_id(\\d+)', bookController.get);
bookRouter.post('/:trip_id(\\d+)', 
    body('tickets').custom(value => value > 0)
    .withMessage('Must be greater than 0'),
    bookController.post);

export default bookRouter;
