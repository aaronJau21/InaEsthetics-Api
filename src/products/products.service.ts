import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/products/create-product.dto';
import { UpdateProductDto } from './dto/products/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'supertest';
import { ProductImages } from './dto/images/create-productsImages.dto';

@Injectable()
export class ProductsService {

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create( createProductDto: CreateProductDto, req: Request ) {

    const payload = req[ 'user' ];

    if ( await this.prisma.productos.findFirst( {
      where: {
        nombre: createProductDto.nombre
      }
    } ) ) throw new BadRequestException( 'Ya Existe el Producto' );

    const newProduct = await this.prisma.productos.create( {
      data: {
        nombre: createProductDto.nombre,
        descripcion: createProductDto.descripcion,
        precio: createProductDto.precio,
        estado: true,
        usersId: payload.id
      }
    } );

    if ( createProductDto.images && createProductDto.images.trim() !== "" ) {
      await this.prisma.productsImages.create( {
        data: {
          images: createProductDto.images,
          product_id: newProduct.id,
        },
      } );
    }

    return newProduct;
  }

  async findAll() {
    const products = await this.prisma.productos.findMany( {
      include: {
        images: true
      }
    } );
    return products;
  }

  findOne( id: number ) {
    return `This action returns a #${ id } product`;
  }

  update( id: number, updateProductDto: UpdateProductDto ) {
    return `This action updates a #${ id } product`;
  }

  remove( id: number ) {
    return `This action removes a #${ id } product`;
  }
}
