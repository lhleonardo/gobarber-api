import { Router } from 'express';
import multer from 'multer';

import ensureAuthentication from '../middlewares/ensureAuthentication';

import config from '@config/upload';

import UsersController from '@modules/users/controllers/UsersController';
import UserAvatarController from '@modules/users/controllers/UserAvatarController';

const routes = Router();
const upload = multer(config);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

routes.post('/', usersController.create);

routes.patch(
  '/',
  ensureAuthentication,
  upload.single('avatar'),
  userAvatarController.update,
);

export default routes;
