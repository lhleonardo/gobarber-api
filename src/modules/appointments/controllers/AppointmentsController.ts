import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentService from '../services/CreateAppointmentService';
import { parseISO } from 'date-fns';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const convertedDate = parseISO(date);

    const service = container.resolve(CreateAppointmentService);

    const result = await service.execute({ provider_id, date: convertedDate });

    return response.json(result);
  }
}
