import { Router } from 'express';
import multer from 'multer';

import ensureAuthentication from '../middlewares/ensureAuthentication';

import config from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '@modules/users/controllers/UsersController';
import UserAvatarController from '@modules/users/controllers/UserAvatarController';

const routes = Router();
const upload = multer(config);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
    },
  }),
  usersController.create,
);

routes.patch(
  '/',
  ensureAuthentication,
  upload.single('avatar'),
  userAvatarController.update,
);

export default routes;
