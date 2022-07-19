import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'AngelinaJolie1975@example.com',
    description: 'Your email',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'my-secret_incredible#password!123',
    description: 'Your password',
  })
  password: string;
}
