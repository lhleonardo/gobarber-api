import { startOfHour } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepository';
import Appointment from '../models/Appointment';

interface CreateAppointmentInterface {
  provider: string;
  date: Date;
}

export default class CreateAppointmentService {
  private repository: AppointmentRepository;

  constructor(repository: AppointmentRepository) {
    this.repository = repository;
  }

  public execute({ provider, date }: CreateAppointmentInterface): Appointment {
    const parsedDate = startOfHour(date);

    if (this.repository.findByDate(parsedDate)) {
      throw Error('Já existe um agendamento marcado para esse horário.');
    }

    const appointment = this.repository.create({ provider, date: parsedDate });

    return appointment;
  }
}
