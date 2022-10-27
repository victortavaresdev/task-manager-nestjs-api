import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../users/repositories/users.repository';

export interface UserProps {
  id: string;
  name: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserProps> {
    const user = await this.usersRepo.findByEmail(email);
    if (!user) throw new BadRequestException('Invalid credentials');

    const plainPassword = await bcrypt.compare(pass, user.password);
    if (!plainPassword) throw new BadRequestException('Invalid credentials');

    const { created_at, updated_at, password, ...data } = user;
    return data;
  }

  async login(user: UserProps): Promise<{ access_token: string }> {
    const { name, email, id } = user;

    const payload = {
      sub: id,
      name,
      email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
