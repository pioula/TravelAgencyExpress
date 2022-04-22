import express from 'express';

import bookController from '../controllers/book.controller.mjs';

const bookRouter = express.Router();

bookRouter.get('/:trip_id(\\d+)', bookController.get);

export default bookRouter;
