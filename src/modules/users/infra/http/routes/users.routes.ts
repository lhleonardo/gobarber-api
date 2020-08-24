import { Router } from 'express';
import multer from 'multer';

import ensureAuthentication from '../middlewares/ensureAuthentication';

import config from '@config/upload';

import UsersController from '@modules/users/controllers/UsersController';

const routes = Router();
const upload = multer(config);
const usersController = new UsersController();

routes.post('/', usersController.create);

routes.patch(
  '/',
  ensureAuthentication,
  upload.single('avatar'),
  usersController.update,
);

export default routes;
