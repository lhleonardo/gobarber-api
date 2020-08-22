import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '@modules/appointments/repositories/AppointmentRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';

interface Request {
  provider_id: string;
  date: Date;
}

export default class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const repository = getCustomRepository(AppointmentRepository);
    const parsedDate = startOfHour(date);

    if (await repository.findByDate(parsedDate)) {
      throw new AppError('This time has already been scheduled');
    }

    const appointment = repository.create({ provider_id, date: parsedDate });

    await repository.save(appointment);

    return appointment;
  }
}
