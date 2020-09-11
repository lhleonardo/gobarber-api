import { Router } from 'express';

import ensureAuthentication from '../middlewares/ensureAuthentication';

import ProfileController from '@modules/users/controllers/ProfileController';
const profileController = new ProfileController();

const profileRoutes = Router();

profileRoutes.use(ensureAuthentication);

profileRoutes.get('/', profileController.show);
profileRoutes.put('/', profileController.update);

export default profileRoutes;
