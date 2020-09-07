import { startOfHour, setMinutes, setSeconds, setMilliseconds } from 'date-fns';
import AppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const parsedDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      parsedDate,
    );
    if (findAppointmentInSameDate) {
      throw new AppError('This time has already been scheduled');
    }

    const appointment = await this.appointmentRepository.create({
      provider_id,
      date: parsedDate,
    });

    return appointment;
  }
}
