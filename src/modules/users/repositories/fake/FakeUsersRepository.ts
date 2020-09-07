import IUserRepository from '../IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';

import { v4 as uuid } from 'uuid';

class FakeUsersRepository implements IUserRepository {
  private users: User[] = [];

  async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, data);

    this.users.push(user);

    return user;
  }
  async save(data: User): Promise<User> {
    const index = this.users.findIndex(user => user.id === data.id);

    this.users[index] = data;

    return data;
  }
  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);

    return user;
  }
  async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id);

    return user;
  }
}

export default FakeUsersRepository;
