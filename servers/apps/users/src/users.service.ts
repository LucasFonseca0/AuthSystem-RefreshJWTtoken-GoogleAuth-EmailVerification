import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { ActivationDto, LoginDto, RegisterDto } from './dto/user.dto';

import { PrismaService } from '../../../prisma/Prisma.service';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { EmailService } from './email/email.service';
import { TokenSender } from './utils/sendToken';

interface UserData {
  name: string;
  email: string;
  password: string;
  phone_number: number;
}

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  //register user
  async register(registerDto: RegisterDto, response: Response) {
    const { name, email, password, phone_number } = registerDto;

    //email validation
    const isEmailExist = await this.prisma.user.findUnique({
      where: { email },
    });
    if (isEmailExist)
      throw new BadRequestException('user already exist with this email');

    //phone number validation
    const isPhoneNumberExist = await this.prisma.user.findUnique({
      where: { phone_number },
    });
    if (isPhoneNumberExist)
      throw new BadRequestException(
        'user already exist with this Phone Number',
      );

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      name,
      email,
      password: hashedPassword,
      phone_number,
    };
    const activation = await this.createActivationToken(user);
    const activationCode = activation.activationCode;
    const activation_token = activation.token;

    await this.emailService.sendMail({
      email,
      subject: 'Activate your account!',
      template: './activation-mail',
      name,
      activationCode,
    });

    return { activation_token: activation_token, response };
  }

  // create activation token
  async createActivationToken(user: UserData) {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const token = this.jwtService.sign(
      {
        user,
        activationCode,
      },
      {
        secret: this.configService.get<string>('ACTIVATION_SECRET'),
        expiresIn: '5m',
      },
    );
    return { token, activationCode };
  }

  //activation user
  async activateUser(activationDto: ActivationDto, response: Response) {
    const { activationCode, activationToken } = activationDto;

    const newUser: { user: UserData; activationCode: string } =
      this.jwtService.verify(activationToken, {
        secret: this.configService.get<string>('ACTIVATION_SECRET'),
      } as JwtVerifyOptions) as { user: UserData; activationCode: string };

    if (newUser.activationCode !== activationCode)
      throw new BadRequestException('invalid activation code');

    const { name, email, password, phone_number } = newUser.user;

    const existsUser = await this.prisma.user.findUnique({ where: { email } });

    if (existsUser)
      throw new BadRequestException('user already exist with this email! ');

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
        phone_number,
      },
    });

    return { user, response };
  }

  //Login Service
  async Login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user && (await this.comparePassword(password, user.password))) {
      const tokenSender = new TokenSender(this.configService, this.jwtService);
      return tokenSender.sendToken(user);
    } else {
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
        error: {
          message: 'Invalid email or password',
        },
      };
    }
  }

  // compare with hashedpassword
  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<Boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
  //Get logged in user
  async getLoggedInUser(req: any) {
    const accessToken = req.accessToken;
    const refreshToken = req.refreshToken;
    const user = req.user;
    console.log({user,accessToken,refreshToken});

    return {user,accessToken,refreshToken}

  }

  //logout user

  async Logout(req:any){
    req.user =null
    req.refreshtoken =null
    req.accesstoken =null

    return {message:'Logged out successfully'}
  }

  //get all users service
  async getUsers() {
    return this.prisma.user.findMany({});
  }
}
