import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const router = Router();

const appointments = new AppointmentRepository();

router.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const convertedDate = parseISO(date);

    const service = new CreateAppointmentService(appointments);

    const result = service.execute({ provider, date: convertedDate });

    return response.json(result);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

router.get('/', (request, response) => {
  const data = appointments.all();

  return response.json(data);
});

export default router;
