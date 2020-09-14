import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthAvailabilityService from '../services/ListProviderMonthAvailabilityService';

class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { year, month } = request.body;

    const { providerId } = request.params;

    const service = container.resolve(ListProviderMonthAvailabilityService);

    const availability = await service.execute({ providerId, year, month });

    return response.json(availability);
  }
}

export default ProviderMonthAvailabilityController;
