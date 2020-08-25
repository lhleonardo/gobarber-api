// PRECISA estar antes do serviço para não tentar injeção
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';

import CreateAppointmentService from './CreateAppointmentService';

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
});
