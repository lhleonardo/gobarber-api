import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import AppointmentsController from '@modules/appointments/controllers/AppointmentsController';
import ProviderAppointmentsController from '@modules/appointments/controllers/ProviderAppointmentsController';

const router = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

// necessitam de autenticação
router.use(ensureAuthentication);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      providerId: Joi.string().uuid().required(),
      date: Joi.date().required(),
    },
  }),
  appointmentsController.create,
);
router.get(
  '/me',
  celebrate({
    [Segments.BODY]: {
      year: Joi.number().integer().required,
      month: Joi.number().integer().required().min(1).max(12),
      day: Joi.number().integer().required().min(1).max(31),
    },
  }),
  providerAppointmentsController.index,
);

export default router;
