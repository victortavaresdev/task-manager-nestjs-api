import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { TasksRepository } from './repositories/tasks.repository';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';

@Module({
  providers: [TasksResolver, TasksService, TasksRepository, PrismaService],
})
export class TasksModule {}
