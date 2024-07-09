// src/products/dto/create-product.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  productTitle: string;

  @IsString()
  @IsOptional()
  category: string;

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