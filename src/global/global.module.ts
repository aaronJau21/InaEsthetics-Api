import { Module } from '@nestjs/common';
import { HashService } from './hash/hash.service';
import { JwtGlobalService } from './jwt/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module( {
  providers: [ HashService, JwtGlobalService ],
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register( {
      global: true,
      secret: process.env.JWT_SEED,
      signOptions: { expiresIn: '6h' },
    } ),
  ],
  exports: [ HashService, JwtGlobalService ]
} )
export class GlobalModule { }
