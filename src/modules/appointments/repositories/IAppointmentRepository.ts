import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAppointmentsInMonthDTO from '../dtos/IFIndAppointmentsInMonthDTO';

export default interface IAppointmentRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;

  findByDate(date: Date): Promise<Appointment | undefined>;

  findInMonth(data: IFindAppointmentsInMonthDTO): Promise<Appointment[]>;
}
