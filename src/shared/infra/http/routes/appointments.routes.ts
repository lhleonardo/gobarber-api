import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/appointments/CreateAppointmentService';

import ensureAuthentication from '../middlewares/ensureAuthentication';

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
