import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { TokenWithUserPayload, UserCredentialsDto } from './dto';
import {} from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(userCredentialsDto: UserCredentialsDto) {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { email: userCredentialsDto.email },
      });
      user.verifyPassword(userCredentialsDto.password);
      const payload = instanceToPlain(user);
      const token = await this.jwtService.signAsync(payload);
      return <TokenWithUserPayload>{
        payload,
        token,
      };
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(
          `User with email ${userCredentialsDto.email} cannot be founded!`,
        );
      }
      throw new InternalServerErrorException(error, 'Other internal error');
    }
  }
}
