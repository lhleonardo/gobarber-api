// PRECISA estar antes do serviço para não tentar injeção
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';

import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
  it('Deve criar um novo agendamento', async () => {
    const repository = new FakeAppointmentRepository();

    const service = new CreateAppointmentService(repository);
    const appointment = await service.execute({
      date: new Date(),
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('Não deve criar dois agendamentos no mesmo dia', async () => {
    const appointmentDate = new Date(2020, 4, 11, 13);

    const repository = new FakeAppointmentRepository();
    const service = new CreateAppointmentService(repository);
    await service.execute({
      date: appointmentDate,
      provider_id: '123123',
    });

    expect(
      service.execute({
        date: appointmentDate,
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
