import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from 'src/user/entities/user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from './auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get('/info')
  inforAuth(@Req() req: Request) {
    return this.authService.authInfo(req['user_data'].id);
  }

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
