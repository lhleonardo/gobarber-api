import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

export default class AppointmentRepository {
  private data: Appointment[];

  constructor() {
    this.data = [];
  }

  public all(): Appointment[] {
    return this.data;
  }

  public create({ provider, date }: Omit<Appointment, 'id'>): Appointment {
    const appointment = new Appointment(provider, date);

    this.data.push(appointment);

    return appointment;
  }

  public findByDate(date: Date): Appointment | undefined {
    const appointment = this.data.find(app => isEqual(app.date, date));

    return appointment;
  }
}
