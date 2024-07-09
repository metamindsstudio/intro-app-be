// src/products/products.service.ts
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from '../users/schema/user.schema'

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async create(createProductDto: CreateProductDto, user: User): Promise<Product> {
    console.log(user,">>user")
    const createdProduct = new this.productModel({
      ...createProductDto,
      seller: user,
    });
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().populate('seller').exec();
  }

  async findBySeller(userId: string): Promise<Product[]> {
    return this.productModel.find({ seller: userId }).exec();
  }
}