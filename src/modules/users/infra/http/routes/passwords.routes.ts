import { Router } from 'express';
import ForgotPasswordController from '@modules/users/controllers/ForgotPasswordController';
import ResetPasswordController from '@modules/users/controllers/ResetPasswordController';

const passwordRoutes = Router();

const forgotController = new ForgotPasswordController();
const resetController = new ResetPasswordController();

passwordRoutes.post('/forgot', forgotController.store);
passwordRoutes.post('/reset', resetController.store);

export default passwordRoutes;
