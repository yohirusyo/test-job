import { ApiProperty } from '@nestjs/swagger';
import { ROLE } from '../entities/user.entity';

export class UserPayload {
  @ApiProperty({
    example: 'AngelinaJolie1975',
    description: 'Your email',
  })
  email: string;

  @ApiProperty({
    example: ROLE.CLIENT,
    enum: ROLE,
    description: 'Your role',
  })
  role: ROLE;
}
