import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { UserEntity } from '../entities/user.entity';
import { hashPassword } from '../utils/hashPassword';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserInput): Promise<UserEntity> {
    const userEmail = await this.findByEmail(data.email);
    if (userEmail) throw new ConflictException('Email already exists');

    const hashedPassword = await hashPassword(data.password);
    const body = {
      ...data,
      password: hashedPassword,
    };

    return this.prisma.user.create({
      data: body,
    });
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(id: string, data: UpdateUserInput): Promise<UserEntity> {
    await this.findById(id);

    const hashedPassword = await hashPassword(data.password);
    const body = {
      ...data,
      password: hashedPassword,
    };

    return this.prisma.user.update({ where: { id }, data: body });
  }

  async remove(id: string): Promise<UserEntity> {
    await this.findById(id);
    return this.prisma.user.delete({ where: { id } });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
