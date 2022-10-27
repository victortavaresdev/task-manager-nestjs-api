import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateTaskInput } from '../dto/create-task.input';
import { UpdateTaskInput } from '../dto/update-task.input';
import { TaskEntity } from '../entities/task.entity';

@Injectable()
export class TasksRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: any, data: CreateTaskInput): Promise<TaskEntity> {
    const task = {
      ...data,
      user_id: user.id,
    };

    return this.prisma.task.create({ data: task });
  }

  async findById(id: string): Promise<TaskEntity> {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, data: UpdateTaskInput): Promise<TaskEntity> {
    await this.findById(id);
    return this.prisma.task.update({ where: { id }, data });
  }

  async remove(id: string): Promise<TaskEntity> {
    await this.findById(id);
    return this.prisma.task.delete({ where: { id } });
  }
}
