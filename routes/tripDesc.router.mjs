import express from 'express';

import tripDescriptionController from '../controllers/tripDesc.controller.mjs';

const tripDescriptionRouter = express.Router();

tripDescriptionRouter.get('/:trip_id(\\d+)', tripDescriptionController.get);

export default tripDescriptionRouter;
