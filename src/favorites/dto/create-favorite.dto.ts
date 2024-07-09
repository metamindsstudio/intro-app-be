// src/favorites/dto/create-favorite.dto.ts
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateFavoriteDto {
  @IsNotEmpty()
  @IsMongoId()
  productId: string;
}