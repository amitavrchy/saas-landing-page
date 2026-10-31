import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class WaitlistDto {
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  company?: string;
}

export class SubscriberDto {
  @IsEmail()
  email!: string;
}

export class DemoRequestDto {
  @IsString()
  @MinLength(1)
  name!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  message?: string;
}