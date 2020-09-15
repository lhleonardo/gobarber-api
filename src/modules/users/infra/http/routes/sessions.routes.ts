import { Router } from 'express';
import SessionsController from '@modules/users/controllers/SessionsController';
import { celebrate, Segments, Joi } from 'celebrate';

const routes = Router();
const sessionsController = new SessionsController();

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.generate,
);

export default routes;
