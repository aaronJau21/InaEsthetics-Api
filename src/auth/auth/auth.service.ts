import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/user/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashService } from 'src/global/hash/hash.service';
import { RolesUsuarios, User } from '@prisma/client';
import { LoginDto } from './dto/login/login.dto';
import { LoginResponse } from './interfaces';
import { JwtGlobalService } from 'src/global/jwt/jwt.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly hashService: HashService,
    private readonly jwtGlobalService: JwtGlobalService
  ) { }

  async registerUser( createUserDto: CreateUserDto ): Promise<User> {
    const { password, ...user } = createUserDto;

    try {
      // Asegúrate de que hash() sea asíncrono si es necesario
      const hash = await this.hashService.hash( password );

      const createUser = await this.prisma.user.create( {
        data: {
          ...user,
          password: hash
        }
      } );

      return createUser;
    } catch ( error ) {
      if ( error.code === 'P2002' ) {
        throw new BadRequestException( 'El usuario ya existe' );
      }
      throw new Error( `Error al crear usuario: ${ error.message }` );
    }
  }

  async login( loginDto: LoginDto ): Promise<LoginResponse> {

    const existUser = await this.prisma.user.findFirst( {
      where: {
        user: loginDto.user
      }
    } );

    if ( !existUser ) throw new NotFoundException( 'Credenciales incorrectas' );

    const comparePassword = this.hashService.compare( loginDto.password, existUser.password );

    if ( !comparePassword ) throw new NotFoundException( 'Credenciales incorrectas' );

    const { password, created_at, updated_at, status, ...user } = existUser;

    return {
      user,
      token: await this.jwtGlobalService.generateJwt( { id: existUser.id, user: existUser.user, role: existUser.role } )
    };

  }

}
