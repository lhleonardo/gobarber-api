import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/appointments/CreateAppointmentService';

const router = Router();

router.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const convertedDate = parseISO(date);

    const service = new CreateAppointmentService();

    const result = await service.execute({ provider_id, date: convertedDate });

    return response.json(result);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

router.get('/', async (request, response) => {
  const appointments = getCustomRepository(AppointmentRepository);
  const data = await appointments.find();

  return response.json(data);
});

export default router;
