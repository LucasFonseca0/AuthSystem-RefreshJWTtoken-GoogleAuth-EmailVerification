import { BadRequestException, UseFilters, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { ActivationResponse, ForgotPasswordResponse, LoginResponse, LogoutResponse, RegisterResponse } from './types/user.types';
import { ActivationDto, ForgotPasswordDto, LoginDto, RegisterDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { Response } from 'express';
import { AuthGuard } from './guards/auth.guard';

@Resolver('User')
// @UseFilters()
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerDto') registerDto: RegisterDto,
    @Context() context: { res: Response },
  ): Promise<RegisterResponse> {
    if (!registerDto.name || !registerDto.email || !registerDto.password) {
      throw new BadRequestException('Please fill the all fields');
    }

    const { activation_token } = await this.userService.register(
      registerDto,
      context.res,
    );
    return { activation_token };
  }

  @Mutation(() => ActivationResponse)
  async activationUser(
    @Args('activationDto') activationDto: ActivationDto,
    @Context() context: { res: Response },
  ): Promise<ActivationResponse> {
    return await this.userService.activateUser(activationDto, context.res);
  }

  @Mutation(()=> LoginResponse)
  async Login(
    @Args('email') email: string,
    @Args('password') password: string,

  ):Promise<LoginResponse>{
    return this.userService.Login({email,password})
  }

  @Query(() => LoginResponse)
  @UseGuards(AuthGuard)
  async getLoggedInUser(
    @Context() context : {req:Request}
  ){
    return this.userService.getLoggedInUser(context.req)
  }
  @Query(() => ForgotPasswordResponse)
  async forgotPassword(
    @Args('forgotPasswordDto') forgotPasswordDto:ForgotPasswordDto,
  
  ):Promise<ForgotPasswordResponse>{
    return this.userService.forgotPassword(forgotPasswordDto)
  }
  @Query(() => LogoutResponse)
  @UseGuards(AuthGuard)
  async logOutUser(
    @Context() context : {req:Request}
  ){
    return this.userService.Logout(context.req)
  }
  
  @Query(() => [User])
  async getUsers() {
    return this.userService.getUsers();
  }
}
