import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderAppointmentsService from '../services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  async index(request: Request, response: Response): Promise<Response> {
    const providerId = request.user.id;
    const { day, month, year } = request.body;
    const service = container.resolve(ListProviderAppointmentsService);

    const appointments = await service.execute({
      providerId,
      day,
      month,
      year,
    });

    return response.json(appointments);
  }
}
