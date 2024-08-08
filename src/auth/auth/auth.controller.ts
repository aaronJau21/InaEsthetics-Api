import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/user/create-user.dto';
import { LoginDto } from './dto/login/login.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller( 'auth' )
export class AuthController {
  constructor( private readonly authService: AuthService ) {
  }

  // @UseGuards( AuthGuard )
  @Post( 'register' )
  register( @Body() createUserDto: CreateUserDto ) {
    return this.authService.registerUser( createUserDto );
  }

  @Post( 'login' )
  login( @Body() loginDto: LoginDto ) {
    return this.authService.login( loginDto );
  }

}
