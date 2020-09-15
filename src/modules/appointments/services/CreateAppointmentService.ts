import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import { injectable, inject, container } from 'tsyringe';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
  providerId: string;
  date: Date;
  userId: string;
}

@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({
    providerId,
    date,
    userId,
  }: IRequest): Promise<Appointment> {
    const parsedDate = startOfHour(date);

    if (isBefore(parsedDate, Date.now())) {
      throw new AppError('Esse horário é inválido pois ele já passou.');
    }

    const hour = getHours(parsedDate);

    if (hour < 8 || hour > 17) {
      throw new AppError('Fora do horário de trabalho (entre 08:00 até 17:00)');
    }

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      parsedDate,
    );
    if (findAppointmentInSameDate) {
      throw new AppError('Esse horário já foi agendado');
    }

    const appointment = await this.appointmentRepository.create({
      providerId,
      userId,
      date: parsedDate,
    });

    const formattedDate = format(parsedDate, "dd/MM/yyyy 'às' HH:mm'h'", {
      locale: ptBR,
    });

    await this.notificationsRepository.create({
      recipientId: providerId,
      content: `Novo agendamento marcado para o dia ${formattedDate}`,
    });

    return appointment;
  }
}
