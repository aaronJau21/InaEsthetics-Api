import { IsString } from 'class-validator';

export class ProductImages {

  @IsString()
  images: string;

}