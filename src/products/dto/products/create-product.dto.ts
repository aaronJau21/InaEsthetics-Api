import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductImages } from '../images/create-productsImages.dto';
export class CreateProductDto {

  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsNumber()
  precio: number;

  @IsOptional()
  @IsString()
  images?: string;

}
