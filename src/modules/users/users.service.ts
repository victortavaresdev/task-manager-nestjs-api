import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  create(data: CreateUserInput) {
    return this.usersRepo.create(data);
  }

  findById(id: string) {
    return this.usersRepo.findById(id);
  }

  update(id: string, data: UpdateUserInput) {
    return this.usersRepo.update(id, data);
  }

  remove(id: string) {
    return this.usersRepo.remove(id);
  }
}
