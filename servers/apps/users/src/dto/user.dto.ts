import { InputType, Field } from '@nestjs/graphql';

import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator';

@InputType()
export class RegisterDto {
  @Field()
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be least 9 characters' })
  @IsString()
  password: string;

  @Field()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;
  @Field()
  @IsNotEmpty({ message: 'phone Number is required' })
  @IsPhoneNumber()
  phone_number: number;
}

@InputType()
export class ActivationDto{
  @Field()
  @IsNotEmpty()
  activationToken: string

  @Field()
  @IsNotEmpty()
  activationCode:string


}

@InputType()
export class LoginDto {
  @Field()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be least 8 characters' })
  @IsString()
  password: string;

  @Field()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;
  
}
 