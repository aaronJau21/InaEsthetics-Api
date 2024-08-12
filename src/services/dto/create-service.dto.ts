import { IsString } from 'class-validator';

export class CreateServiceDto {

  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

}