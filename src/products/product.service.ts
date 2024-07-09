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
    const createdProduct = new this.productModel({
      ...createProductDto,
      seller: user.userId, 
    });
    return createdProduct.save();
  }

  async findAll(query: { category?: string, city?: string }): Promise<Product[]> {
    const filters: any = {};
    if (query.category) {
      filters.category = query.category;
    }
    if (query.city) {
      filters.location = query.city;
    }
    return this.productModel.find(filters).populate('seller').exec();
  }

  async findBySeller(userId: string): Promise<Product[]> {
    return this.productModel.find({ seller: userId }).exec();
  }
}