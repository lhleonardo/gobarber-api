import { startOfHour } from 'date-fns';
import AppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}

export default class CreateAppointmentService {
  constructor(private appointmentRepository: IAppointmentRepository) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const parsedDate = startOfHour(date);

    if (await this.appointmentRepository.findByDate(parsedDate)) {
      throw new AppError('This time has already been scheduled');
    }

    const appointment = await this.appointmentRepository.create({
      provider_id,
      date: parsedDate,
    });

    return appointment;
  }
}
