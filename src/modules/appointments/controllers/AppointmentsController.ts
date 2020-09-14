import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentService from '../services/CreateAppointmentService';
import { parseISO } from 'date-fns';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { providerId, date } = request.body;
    const userId = request.user.id;
    const convertedDate = parseISO(date);

    const service = container.resolve(CreateAppointmentService);

    const result = await service.execute({
      providerId,
      userId,
      date: convertedDate,
    });

    return response.json(result);
  }
}
