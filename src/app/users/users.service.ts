import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './models';
import { UserWithPassword } from './models';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(id: User['id']): Promise<User> {
    const user = this.usersRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getUserWithPasswordByEmail(email: User['email']): Promise<UserWithPassword> {
    const user = this.usersRepository.getUserWithPasswordByEmail(email);

    return user;
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.getUsers();
  }

  async createUser(userData: Omit<UserWithPassword, 'id'>): Promise<User> {
    return this.usersRepository.createUser(userData);
  }

  async updateUser(userData: Pick<User, 'id'> & Partial<User>): Promise<User> {
    return this.usersRepository.updateUser(userData);
  }

  async deleteUser(id: User['id']): Promise<User> {
    return this.usersRepository.deleteUser(id);
  }
}
