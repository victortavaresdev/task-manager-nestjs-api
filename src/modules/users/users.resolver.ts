import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { checkAuthorization } from 'src/common/utils/checkAuthorization.utils';
import { CurrentUser } from '../auth/auth.resolver';
import { Action } from '../auth/casl/casl-ability.factory';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserEntity, { description: 'Create user' })
  createUser(@Args('data') data: CreateUserInput) {
    return this.usersService.create(data);
  }

  @UseGuards(JwtGuard)
  @Query(() => UserEntity, { description: 'Find user by Id' })
  findUser(
    @CurrentUser() user: any,
    @Args('id', { type: () => String }) id: string,
  ) {
    checkAuthorization(user, id, Action.Read, UserEntity);
    return this.usersService.findById(id);
  }

  @UseGuards(JwtGuard)
  @Mutation(() => UserEntity, { description: 'Update user' })
  updateUser(
    @CurrentUser() user: any,
    @Args('id', { type: () => String }) id: string,
    @Args('data') data: UpdateUserInput,
  ) {
    checkAuthorization(user, id, Action.Update, UserEntity);
    return this.usersService.update(id, data);
  }

  @UseGuards(JwtGuard)
  @Mutation(() => UserEntity, { description: 'Remove user by Id' })
  removeUser(
    @CurrentUser() user: any,
    @Args('id', { type: () => String }) id: string,
  ) {
    checkAuthorization(user, id, Action.Delete, UserEntity);
    return this.usersService.remove(id);
  }
}
