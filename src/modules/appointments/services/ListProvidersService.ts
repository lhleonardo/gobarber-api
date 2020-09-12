import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListProviderServices {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}
  public async execute({
    excludeUserId,
  }: IFindAllProvidersDTO): Promise<User[]> {
    const result = await this.userRepository.findAllProviders({
      excludeUserId,
    });

    return result;
  }
}

export default ListProviderServices;
