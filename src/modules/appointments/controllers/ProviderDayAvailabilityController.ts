import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailabilityService from '../services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { year, month, day } = request.body;
    const { providerId } = request.params;
    const service = container.resolve(ListProviderDayAvailabilityService);

    const availability = await service.execute({
      providerId,
      year,
      month,
      day,
    });

    return response.json(availability);
  }
}

export default ProviderDayAvailabilityController;