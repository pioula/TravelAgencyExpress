import express from 'express';

import userMainController from '../controllers/userMain.controller.mjs';

const userMainRouter = express.Router();

userMainRouter.get('/', userMainController.get);
userMainRouter.post('/', userMainController.post);

export default userMainRouter;