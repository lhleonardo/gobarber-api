import ProvidersController from '@modules/appointments/controllers/ProvidersController';
import { Router } from 'express';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.get('/', providersController.index);

export default providersRouter;
