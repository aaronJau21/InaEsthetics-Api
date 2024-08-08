import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GlobalModule } from 'src/global/global.module';
import { AuthGuard } from './guards/auth.guard';

@Module( {
  controllers: [ AuthController ],
  providers: [ AuthService, AuthGuard ],
  imports: [
    PrismaModule,
    GlobalModule
  ],
  exports: [ AuthGuard, GlobalModule ]
} )
export class AuthModule { }
