import { Router } from 'express';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import AppointmentsController from '@modules/appointments/controllers/AppointmentsController';
import ProviderAppointmentsController from '@modules/appointments/controllers/ProviderAppointmentsController';

const router = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

// necessitam de autenticação
router.use(ensureAuthentication);

router.post('/', appointmentsController.create);
router.get('/me', providerAppointmentsController.index);

export default router;
