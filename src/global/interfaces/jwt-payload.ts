import { RolesUsuarios } from '@prisma/client';

export interface IJwtPayload {
  id: number;
  user: string;
  role: RolesUsuarios;
  iat?: number;
  exp?: number;
}