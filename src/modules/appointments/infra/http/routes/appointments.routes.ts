import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';

const router = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

// necessitam de autenticação
router.use(ensureAuthentication);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object({
      providerId: Joi.string().uuid().required(),
      date: Joi.date().required(),
    }).required(),
  }),
  appointmentsController.create,
);

router.get(
  '/me',
  celebrate({
    [Segments.BODY]: Joi.object({
      year: Joi.number().integer().required(),
      month: Joi.number().integer().min(1).max(12),
      day: Joi.number().integer().min(1).max(31),
    }).required(),
  }),
  providerAppointmentsController.index,
);

export default router;
