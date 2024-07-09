// src/products/products.controller.ts
import { Controller, Get, Post, Body, UseGuards, Request, Query, UnauthorizedException } from '@nestjs/common';
import { ProductsService } from './product.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Request() req) {
    if (!req.user.isSeller) {
      throw new UnauthorizedException('Only sellers can post products');
    }
    return this.productsService.create(createProductDto, req.user);
  }

  @Get()
  async findAll(@Query('category') category?: string, @Query('city') city?: string) {
    return this.productsService.findAll({ category, city });
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-products')
  async findBySeller(@Request() req, @Query('category') category?: string, @Query('city') city?: string) {
    return this.productsService.findBySeller(req.user._id, { category, city });
  }
}