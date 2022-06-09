import express from 'express';

import loginSuccessController from '../controllers/login_success.controller.mjs';

const loginSuccessRouter = express.Router();

loginSuccessRouter.get('/', loginSuccessController.get);

export default loginSuccessRouter;