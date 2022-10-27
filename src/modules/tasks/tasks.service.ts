import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { TasksRepository } from './repositories/tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepo: TasksRepository) {}

  create(user: any, data: CreateTaskInput) {
    return this.tasksRepo.create(user, data);
  }

  findById(id: string) {
    return this.tasksRepo.findById(id);
  }

  update(id: string, data: UpdateTaskInput) {
    return this.tasksRepo.update(id, data);
  }

  remove(id: string) {
    return this.tasksRepo.remove(id);
  }
}
