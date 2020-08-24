import { Router } from 'express';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import AppointmentsController from '@modules/appointments/controllers/AppointmentsController';

const router = Router();
const appointmentsController = new AppointmentsController();

// necessitam de autenticação
router.use(ensureAuthentication);
router.post('/', appointmentsController.create);

export default router;
