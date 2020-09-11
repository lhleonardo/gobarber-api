import { Router } from 'express';
import SessionsController from '@modules/users/controllers/SessionsController';

const routes = Router();
const sessionsController = new SessionsController();

routes.post('/', sessionsController.generate);

export default routes;
