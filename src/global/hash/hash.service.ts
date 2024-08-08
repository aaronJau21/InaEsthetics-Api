import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {

  hash( password: string ) {
    const salt = bcrypt.genSaltSync( 10 );
    return bcrypt.hashSync( password, salt );
  }

  compare( password: string, passwordHas: string ) {
    return bcrypt.compareSync( password, passwordHas );
  }


}
