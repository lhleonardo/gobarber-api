import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../repositories/AppointmentRepository';
import Appointment from '../models/Appointment';

interface Request {
  provider: string;
  date: Date;
}

export default class CreateAppointmentService {
  public async execute({ provider, date }: Request): Promise<Appointment> {
    const repository = getCustomRepository(AppointmentRepository);
    const parsedDate = startOfHour(date);

    if (await repository.findByDate(parsedDate)) {
      throw Error('Já existe um agendamento marcado para esse horário.');
    }

    const appointment = repository.create({ provider, date: parsedDate });

    await repository.save(appointment);

    return appointment;
  }
}
