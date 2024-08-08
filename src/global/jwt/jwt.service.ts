import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from '../interfaces/jwt-payload';

@Injectable()
export class JwtGlobalService {

  constructor(
    private readonly jwtService: JwtService
  ) { }

  async generateJwt( payload: IJwtPayload ) {
    const token = await this.jwtService.signAsync( payload );

    return token;
  }

  async verifyJwtoken( token: string ) {
    return await this.jwtService.verifyAsync( token, {
      secret: process.env.JWT_SEED
    } );
  }

}
