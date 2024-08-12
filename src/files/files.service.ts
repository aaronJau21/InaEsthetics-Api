import { join } from 'path';
import { existsSync } from 'fs';

import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FilesService {


  getStaticProductImage( imageName: string ) {

    const path = join( __dirname, '../../uploads/products', imageName );
    if ( !existsSync( path ) ) throw new NotFoundException( `No product found with image ${ imageName }` );

    return path;

  }

}
