// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schema/product.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto, seller: User): Promise<Product> {
    const createdProduct = new this.productModel({
      ...createProductDto,
      seller: seller,
      isReviewed: false, // Set default value
    });
    return createdProduct.save();
  }

  async findAll(query: any): Promise<Product[]> {
    const filter: any = {};
    
    if (query.location) {
      filter.location = query.location;
    }
    
    if (query.category) {
      filter.a = query.category;
    }

    if (query.subCategories) {
      filter.subCategories = query.subCategories;
    }

    if (query.price) {
      filter.price = query.price;
    }

    if (query.industry) {
      filter.industry = query.industry;
    }

    if (query.isReviewed) {
      filter.isReviewed = query.isReviewed;
    }
    
    return this.productModel.find(filter).exec();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }
}