import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '@modules/appointments/repositories/AppointmentRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';

const router = Router();

// necessitam de autenticação
router.use(ensureAuthentication);

router.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const convertedDate = parseISO(date);

  const service = new CreateAppointmentService();

  const result = await service.execute({ provider_id, date: convertedDate });

  return response.json(result);
});

router.get('/', async (request, response) => {
  const appointments = getCustomRepository(AppointmentRepository);
  const data = await appointments.find();

  return response.json(data);
});

export default router;
