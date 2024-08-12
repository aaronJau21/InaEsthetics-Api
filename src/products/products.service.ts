import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/products/create-product.dto';
import { UpdateProductDto } from './dto/products/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'supertest';
import { Productos } from '@prisma/client';
@Injectable()
export class ProductsService {

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create( createProductDto: CreateProductDto, req: Request ): Promise<Productos> {

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

    return newProduct;
  }

  async findAll(): Promise<Productos[]> {
    const products = await this.prisma.productos.findMany( {
      include: {
        images: true
      }
    } );
    return products;
  }

  async findOne( id: number ): Promise<Productos> {
    const produt = await this.prisma.productos.findFirst( { where: { id }, include: { images: true } } );

    if ( !produt ) throw new NotFoundException( 'No existe el Producto' );

    return produt;
  }

  async update( id: number, updateProductDto: UpdateProductDto, req: Request ) {
    await this.findOne( id );
    const payload = req[ 'user' ];
    const producto = await this.prisma.productos.update( {
      where: { id }, data: {
        nombre: updateProductDto.nombre,
        descripcion: updateProductDto.descripcion,
        precio: updateProductDto.precio,
        usersId: payload.id
      }
    } );

    return producto;
  }

  async desactiveProduct( id: number, req: Request ) {
    await this.findOne( id );
    const payload = req[ 'user' ];
    const product = await this.prisma.productos.update( {
      where: { id },
      data: {
        estado: false,
        usersId: payload.id
      }
    } );

    return product;
  }

  async activeProduct( id: number, req: Request ) {
    await this.findOne( id );
    const payload = req[ 'user' ];
    const product = await this.prisma.productos.update( {
      where: { id },
      data: {
        estado: true,
        usersId: payload.id
      }
    } );

    return product;
  }

}
