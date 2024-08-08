import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/products/create-product.dto';
import { UpdateProductDto } from './dto/products/update-product.dto';
import { AuthGuard } from 'src/auth/auth/guards/auth.guard';
import { Request } from 'express';
import { ProductImages } from './dto/images/create-productsImages.dto';

@Controller( 'products' )
export class ProductsController {
  constructor( private readonly productsService: ProductsService ) { }

  @UseGuards( AuthGuard )
  @Post()
  create( @Body() createProductDto: CreateProductDto, @Req() req: any ) {
    return this.productsService.create( createProductDto, req );
  }

  @UseGuards( AuthGuard )
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get( ':id' )
  findOne( @Param( 'id' ) id: string ) {
    return this.productsService.findOne( +id );
  }

  @Patch( ':id' )
  update( @Param( 'id' ) id: string, @Body() updateProductDto: UpdateProductDto ) {
    return this.productsService.update( +id, updateProductDto );
  }

  @Delete( ':id' )
  remove( @Param( 'id' ) id: string ) {
    return this.productsService.remove( +id );
  }
}
