import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { Repository, getRepository } from 'typeorm';

export default class AppointmentRepository implements IAppointmentRepository {
  private _ormRepository: Repository<Appointment>;

  constructor() {
    this._ormRepository = getRepository(Appointment);
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this._ormRepository.create({ provider_id, date });

    await this._ormRepository.save(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this._ormRepository.findOne({
      where: {
        date,
      },
    });

    return findAppointment;
  }
}
