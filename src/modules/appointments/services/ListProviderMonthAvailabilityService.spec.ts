import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let usersRepository: FakeUsersRepository;
let appointmentsRepository: FakeAppointmentRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    appointmentsRepository = new FakeAppointmentRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      appointmentsRepository,
    );
  });

  it('Deve listar a disponibilidade de um prestador em um mês', async () => {
    // não deve sair na relação de dias
    await appointmentsRepository.create({
      providerId: 'valid-provider-user',
      date: new Date(2020, 4, 12, 8, 0, 0),
    });

    // enche um dia todo de agendamentos para um provider
    for (let i = 8; i <= 17; i++) {
      await appointmentsRepository.create({
        providerId: 'valid-provider-user',
        date: new Date(2020, 4, 13, i, 0, 0),
      });
    }

    const availability = await listProviderMonthAvailability.execute({
      providerId: 'valid-provider-user',
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 11, available: true },
        { day: 12, available: true },
        { day: 13, available: false },
        { day: 14, available: true },
      ]),
    );

    // expect(availability).toEqual(expect.arrayContaining());
  });
});
