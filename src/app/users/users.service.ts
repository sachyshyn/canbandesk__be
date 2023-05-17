import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './models';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUser(userId: User['userId']): Promise<User> {
    return this.usersRepository.getUser(userId);
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.getUsers();
  }

  async createUser(userData: Omit<User, 'userId'>): Promise<User> {
    return this.usersRepository.createUser(userData);
  }

  async updateUser(userData: Pick<User, 'userId'> & Partial<User>): Promise<User> {
    return this.usersRepository.updateUser(userData);
  }

  async deleteUser(userId: User['userId']): Promise<User> {
    return this.usersRepository.deleteUser(userId);
  }
}
