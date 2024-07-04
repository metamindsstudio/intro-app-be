// src/products/dtos/create-product.dto.ts
import { IsNotEmpty, IsNumber, IsString, IsArray, IsBoolean, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  productTitle: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsString()
  subCategories: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  location: string;

  @IsString()
  industry: string;

  @IsBoolean()
  isReviewed: boolean;
}