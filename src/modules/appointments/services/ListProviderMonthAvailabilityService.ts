import { getDate, getDaysInMonth } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import IAppointmentRepository from '../repositories/IAppointmentRepository';

interface IRequest {
  providerId: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}
  public async execute({
    providerId,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentRepository.findInMonth({
      providerId,
      year,
      month,
    });

    const numberOfDays = getDaysInMonth(new Date(year, month - 1));

    console.log(`Mês ${month} com ${numberOfDays} dias`);

    const days = Array.from({ length: numberOfDays }, (_, index) => {
      const day = index + 1;

      const appointmentsInDay = appointments.filter(
        appointment => getDate(appointment.date) === day,
      );

      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });

    return days;
  }
}
