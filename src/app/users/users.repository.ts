import { Injectable } from '@nestjs/common';
import { User } from './models';
import { resolvePromise } from '@/shared/helpers';
import { UserWithPassword } from './models';

@Injectable()
export class UsersRepository {
  private usersMap: Map<UserWithPassword['id'], UserWithPassword> = new Map();

  private get userList() {
    return [...this.usersMap.values()];
  }

  async getUserById(id: User['id']): Promise<User | undefined> {
    const user = this.usersMap.get(id);

    const userCopy = { ...user };

    delete userCopy.password;

    return resolvePromise<User>(userCopy);
  }

  async getUserWithPasswordByEmail(email: User['email']): Promise<UserWithPassword | undefined> {
    return this.userList.find((u) => u.email === email);
  }

  async getUsers(): Promise<User[]> {
    return resolvePromise<User[]>(
      this.userList.map((u) => {
        const uCopy = { ...u };

        delete uCopy.password;

        return uCopy;
      })
    );
  }

  async createUser(userData: Omit<UserWithPassword, 'id'>): Promise<User> {
    const user: UserWithPassword = { ...userData, id: Date.now().toString() };

    this.usersMap.set(user.id, user);

    const userCopy = { ...user };
    delete userCopy.password;

    return resolvePromise(userCopy);
  }

  async updateUser(userData: Pick<User, 'id'> & Partial<User>): Promise<User> {
    const currentUserData = this.usersMap.get(userData.id);

    const updatedUser = { ...currentUserData, ...userData };

    const userCopy = { ...updatedUser };

    delete userCopy.password;

    this.usersMap.set(userData.id, updatedUser);

    return resolvePromise<User>(userCopy);
  }

  async deleteUser(id: User['id']): Promise<User> {
    const user = this.usersMap.get(id);

    this.usersMap.delete(id);

    return resolvePromise(user);
  }
}
