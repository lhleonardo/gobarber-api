import { Router } from 'express';
import ForgotPasswordController from '@modules/users/controllers/ForgotPasswordController';
import ResetPasswordController from '@modules/users/controllers/ResetPasswordController';

import { celebrate, Segments, Joi } from 'celebrate';

const passwordRoutes = Router();

const forgotController = new ForgotPasswordController();
const resetController = new ResetPasswordController();

passwordRoutes.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotController.store,
);
passwordRoutes.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetController.store,
);

export default passwordRoutes;
