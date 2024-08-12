import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth/auth.module';
import { GlobalModule } from './global/global.module';
import { ProductsModule } from './products/products.module';
import { FilesModule } from './files/files.module';
import { ServicesModule } from './services/services.module';

@Module( {
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot( {
      rootPath: join( __dirname, '..', 'uploads' )
    } ),
    PrismaModule,
    AuthModule,
    GlobalModule,
    ProductsModule,
    FilesModule,
    ServicesModule,
  ],
} )
export class AppModule { }
