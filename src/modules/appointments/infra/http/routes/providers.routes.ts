import ProviderDayAvailabilityController from '@modules/appointments/controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '@modules/appointments/controllers/ProviderMonthAvailabilityController';
import ProvidersController from '@modules/appointments/controllers/ProvidersController';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import { Router } from 'express';

const providersRouter = Router();
const providersController = new ProvidersController();

const monthAvailaibityController = new ProviderMonthAvailabilityController();
const dayAvailaibityController = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthentication);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:providerId/month-availability',
  monthAvailaibityController.index,
);
providersRouter.get(
  '/:providerId/day-availability',
  dayAvailaibityController.index,
);

export default providersRouter;
