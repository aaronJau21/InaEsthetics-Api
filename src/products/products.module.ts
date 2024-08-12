import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module( {
  controllers: [ ProductsController ],
  providers: [ ProductsService ],
  imports: [
    PrismaModule,
    AuthModule
  ]
} )
export class ProductsModule { }
