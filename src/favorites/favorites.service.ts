// src/favorites/favorites.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite, FavoriteDocument } from './schema/favorites.schema';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { User } from '../users/schema/user.schema';

@Injectable()
export class FavoritesService {
  constructor(@InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>) {}

    async create(createFavoriteDto: CreateFavoriteDto, user: User): Promise<Favorite> {
      console.log(user,"")
    const favorite = new this.favoriteModel({
      user: user.userId,
      product: createFavoriteDto.productId,
    });
    return favorite.save();
  }

    async findAllByUser(userId: string): Promise<Favorite[]> {
    return this.favoriteModel.find({ user: userId }).populate(['product',"user"]).exec();
  }

  async remove(userId: string, productId: string): Promise<void> {
    const result = await this.favoriteModel.deleteOne({ user: userId, product: productId });
    if (result.deletedCount === 0) {
      throw new NotFoundException('Favorite not found');
    }
  }
}
