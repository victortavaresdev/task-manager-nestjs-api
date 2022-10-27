import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { checkAuthorization } from 'src/common/utils/checkAuthorization.utils';
import { CurrentUser } from '../auth/auth.resolver';
import { Action } from '../auth/casl/casl-ability.factory';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { TaskEntity } from './entities/task.entity';
import { TasksRepository } from './repositories/tasks.repository';
import { TasksService } from './tasks.service';

@UseGuards(JwtGuard)
@Resolver(() => TaskEntity)
export class TasksResolver {
  constructor(
    private readonly tasksService: TasksService,
    private readonly tasksRepo: TasksRepository,
  ) {}

  @Mutation(() => TaskEntity, { description: 'Create task' })
  createTask(@CurrentUser() user: any, @Args('data') data: CreateTaskInput) {
    return this.tasksService.create(user, data);
  }

  @Query(() => TaskEntity, { description: 'Find task by Id' })
  async findTask(
    @CurrentUser() user: any,
    @Args('id', { type: () => String }) id: string,
  ) {
    const task = await this.tasksRepo.findById(id);
    checkAuthorization(user, task.user_id, Action.Read, TaskEntity);
    return this.tasksService.findById(id);
  }

  @Mutation(() => TaskEntity, { description: 'Update task' })
  async updateTask(
    @CurrentUser() user: any,
    @Args('id', { type: () => String }) id: string,
    @Args('data') data: UpdateTaskInput,
  ) {
    const task = await this.tasksRepo.findById(id);
    checkAuthorization(user, task.user_id, Action.Update, TaskEntity);
    return this.tasksService.update(id, data);
  }

  @Mutation(() => TaskEntity, { description: 'Remove task by Id' })
  async removeTask(
    @CurrentUser() user: any,
    @Args('id', { type: () => String }) id: string,
  ) {
    const task = await this.tasksRepo.findById(id);
    checkAuthorization(user, task.user_id, Action.Delete, TaskEntity);
    return this.tasksService.remove(id);
  }
}
