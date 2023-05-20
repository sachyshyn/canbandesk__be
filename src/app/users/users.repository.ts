import { Injectable } from '@nestjs/common';
import { User } from './models';
import { resolvePromise } from '@/shared/helpers';

@Injectable()
export class UsersRepository {
  private usersMap: Map<User['userId'], User> = new Map([
    ['1', { email: 'alex@gmail.com', firstName: 'Alex', lastName: 'Sachyshyn', password: '123456', userId: '1' }]
  ]);

  private get userList() {
    return [...this.usersMap.values()];
  }

  async getUserById(userId: User['userId']): Promise<User | undefined> {
    const user = this.usersMap.get(userId);

    return resolvePromise<User>(user);
  }

  async getUserByEmail(email: User['email']): Promise<User | undefined> {
    return this.userList.find((u) => u.email === email);
  }

  async getUsers(): Promise<User[]> {
    return resolvePromise<User[]>(this.userList);
  }

  async createUser(userData: Omit<User, 'userId'>): Promise<User> {
    const user: User = { ...userData, userId: Date.now().toString() };

    this.usersMap.set(user.userId, user);

    return resolvePromise(user);
  }

  async updateUser(userData: Pick<User, 'userId'> & Partial<User>): Promise<User> {
    const currentUserData = this.usersMap.get(userData.userId);

    const updatedUser = { ...currentUserData, userData };

    this.usersMap.set(userData.userId, updatedUser);

    return resolvePromise<User>(updatedUser);
  }

  async deleteUser(userId: User['userId']): Promise<User> {
    const user = this.usersMap.get(userId);

    this.usersMap.delete(userId);

    return resolvePromise(user);
  }
}
