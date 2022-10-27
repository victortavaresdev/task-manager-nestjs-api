import {
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import {
  Args,
  GqlExecutionContext,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response.input';
import { LoginUser } from './dto/login-user.input';
import { ProfileResponse } from './dto/profile-response.input';
import { JwtGuard } from './guards/jwt-auth.guard';
import { LocalGuard } from './guards/local-auth.guard';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Mutation(() => LoginResponse, { description: 'Authenticate user' })
  login(@CurrentUser() user: any, @Args('credentials') credentials: LoginUser) {
    return this.authService.login(user);
  }

  @UseGuards(JwtGuard)
  @Query(() => ProfileResponse, {
    description: 'Get profile information from user',
  })
  getProfile(@CurrentUser() user: any) {
    const data = { sub: user.id, ...user };
    return data;
  }
}
