// src/products/products.controller.ts
import { Controller, Get, Post, Body, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { ProductsService } from './product.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import {User} from "../users/schema/user.schema"

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
  async findAll() {
    return this.productsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-products')
  async findBySeller(@Request() req) {
    return this.productsService.findBySeller(req.user.userId);
  }
}