// src/products/dto/create-product.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { Categories } from '../schemas/product.schema';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  productTitle: string;

  @IsEnum(Categories)
  @IsOptional()
  category: Categories;

  @IsString()
  @IsOptional()
  subCategories: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  industry: string;

  @IsOptional()
  isReviewed: boolean;
}