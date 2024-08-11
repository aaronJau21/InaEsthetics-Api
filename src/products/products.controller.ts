import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UploadedFile } from '@nestjs/common';
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

  @UseGuards( AuthGuard )
  @Get( ':id' )
  findOne( @Param( 'id' ) id: string ) {
    return this.productsService.findOne( +id );
  }

  @UseGuards( AuthGuard )
  @Patch( ':id' )
  update( @Param( 'id' ) id: string, @Body() updateProductDto: UpdateProductDto, @Req() req: any ) {
    return this.productsService.update( +id, updateProductDto, req );
  }

  @UseGuards( AuthGuard )
  @Get( 'desactive/:id' )
  desactiveProduct( @Param( 'id' ) id: string, @Req() req: any ) {
    return this.productsService.desactiveProduct( +id, req );
  }

  @UseGuards( AuthGuard )
  @Get( 'active/:id' )
  activeProduct( @Param( 'id' ) id: string, @Req() req: any ) {
    return this.productsService.activeProduct( +id, req );
  }
}
