import { ApiProperty } from '@nestjs/swagger';
import { UserPayload } from 'src/user/dto';

export class TokenWithUserPayload {
  @ApiProperty({
    type: UserPayload,
    description: 'User payload',
  })
  payload: UserPayload;
  
  @ApiProperty({
    example: '###token###',
    description: 'Bearer token here',
  })
  token: string;
}
