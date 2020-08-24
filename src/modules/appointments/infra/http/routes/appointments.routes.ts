import { Router } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import { container } from 'tsyringe';

const router = Router();

// necessitam de autenticação
router.use(ensureAuthentication);

router.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const convertedDate = parseISO(date);

  const service = container.resolve(CreateAppointmentService);

  const result = await service.execute({ provider_id, date: convertedDate });

  return response.json(result);
});

// router.get('/', async (request, response) => {
//   const repository: IAppointmentRepository = container.resolve(
//     'AppointmentRepository',
//   );
//   const data = await repository.find();

//   return response.json(data);
// });

export default router;
