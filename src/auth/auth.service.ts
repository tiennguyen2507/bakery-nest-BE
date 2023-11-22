import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private useRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  private async hassPassword(password: string): Promise<string> {
    const salfRound = 10;
    const salf = await bcrypt.genSalt(salfRound);
    const hash = await bcrypt.hash(password, salf);
    return hash;
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const hashPassword = await this.hassPassword(registerUserDto.password);
    return await this.useRepository.save({
      ...registerUserDto,
      password: hashPassword,
      refresh_token: 'refresh_token_string',
    });
  }

  private async generateToken(payload: { id: string; email: string }) {
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXP_REFRESH_TOKEN'),
    });

    await this.useRepository.update(
      { email: payload.email },
      { refresh_token: refresh_token },
    );

    return { access_token, refresh_token };
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.useRepository.findOne({
      where: { email: loginUserDto.email },
    });
    if (!user) {
      throw new HttpException('Email is not exist', HttpStatus.UNAUTHORIZED);
    }
    const checkPass = bcrypt.compareSync(loginUserDto.password, user.password);
    if (!checkPass) {
      throw new HttpException('Password is no exist', HttpStatus.UNAUTHORIZED);
    }
    //generate access token and refresh token
    const payload = { id: user.id, email: user.email };

    return this.generateToken(payload);
  }

  async refreshToken(refresh_token) {
    try {
      const verify = await this.jwtService.verify(refresh_token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      const checkExistToken = await this.useRepository.findOneBy({
        email: verify.email,
      });
      if (checkExistToken) {
        const { id, email } = verify;
        return this.generateToken({ id, email });
      } else {
        throw new HttpException(
          'Refresh token is not valid',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Refresh token is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async authInfo(id: string) {
    return this.useRepository.findOne({
      where: { id },
      select: [
        'id',
        'lastName',
        'firstName',
        'email',
        'status',
        'created_at',
        'updated_at',
        'avatar',
        'cart',
      ],
    });
  }
}
