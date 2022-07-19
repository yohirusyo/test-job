import {
  ConflictException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { Repository } from 'typeorm';
import { UserPayload } from './dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ROLE, User } from './entities/user.entity';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    if (
      !(await this.userRepository.findOne({
        where: { email: 'ADMIN@example.com' },
      }))
    ) {
      const admin = new User();
      admin.email = 'ADMIN@example.com';
      admin.password = 'admin';
      admin.role = ROLE.ADMIN;
      await this.userRepository.save(admin);
    }
  }

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    try {
      return instanceToPlain(await this.userRepository.save(user));
    } catch (error) {
      throw new ConflictException(
        `User with email ${createUserDto.email} already exists!`,
      );
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail({ where: { id } });
      return user;
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not founded!`);
    }
  }
}
