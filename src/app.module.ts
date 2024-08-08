import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth/auth.module';
import { GlobalModule } from './global/global.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';

@Module( {
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule,
    GlobalModule,
    ProductsModule,
  ],
} )
export class AppModule { }
