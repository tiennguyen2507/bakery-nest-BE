import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from 'src/user/entities/user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  @ApiResponse({ status: 201, description: 'Login sussess' })
  @ApiResponse({ status: 401, description: 'Login false' })
  @UsePipes(ValidationPipe)
  login(@Body() loginDto: LoginUserDto): Promise<any> {
    return this.authService.login(loginDto);
  }

  @Post('refresh-token')
  refreshToken(@Body() { refreshToken }: any): any {
    return this.authService.refreshToken(refreshToken);
  }
}
