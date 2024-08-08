import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtGlobalService } from 'src/global/jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtGlobalService: JwtGlobalService
  ) { }

  async canActivate( context: ExecutionContext ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader( request );
    if ( !token ) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtGlobalService.verifyJwtoken( token );

      request[ 'user' ] = payload;

    } catch ( error ) {
      throw new UnauthorizedException();
    }


    return true;
  }

  private extractTokenFromHeader( request: Request ): string | undefined {
    const [ type, token ] = request.headers[ 'authorization' ]?.split( ' ' ) ?? [];
    return type === 'Bearer' ? token : undefined;
  }


}
