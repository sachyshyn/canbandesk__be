import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './models';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(userId: User['userId']): Promise<User> {
    return this.usersRepository.getUserById(userId);
  }

  async getUserByEmail(email: User['email']): Promise<User> {
    return this.usersRepository.getUserByEmail(email);
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
