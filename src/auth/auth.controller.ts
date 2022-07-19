import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators';
import { CreateUserDto, UserPayload } from '../user/dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { TokenWithUserPayload, UserCredentialsDto } from './dto';

@ApiTags('Working with authorization')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: 'Users login' })
  @ApiResponse({ status: 201, type: TokenWithUserPayload })
  @ApiResponse({ status: 403, description: 'Bad password.' })
  @ApiResponse({ status: 404, description: 'User not founded.' })
  @ApiResponse({
    status: 500,
    description: 'Other internal server error. Check error details.',
  })
  @Public()
  @Post('login')
  login(@Body() userCredentialsDto: UserCredentialsDto) {
    return this.authService.login(userCredentialsDto);
  }

  @ApiOperation({ summary: 'Users registration' })
  @ApiResponse({ status: 201, type: UserPayload })
  @ApiResponse({ status: 409, description: 'User already exists.' })
  @Public()
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
