import { RolesUsuarios } from '@prisma/client';
import { IsEnum, IsString, MinLength } from 'class-validator';

export class CreateUserDto {

  @IsString()
  user: string;

  @IsString()
  @MinLength( 6 )
  password: string;

  @IsEnum( RolesUsuarios )
  role: RolesUsuarios;

}