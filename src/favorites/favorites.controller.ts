// src/favorites/favorites.controller.ts
import { Controller, Post, Get, Delete, Body, UseGuards, Request, Param } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createFavoriteDto: CreateFavoriteDto, @Request() req) {
    return this.favoritesService.create(createFavoriteDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllByUser(@Request() req) {
    return this.favoritesService.findAllByUser(req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':productId')
  async remove(@Request() req, @Param('productId') productId: string) {
    return this.favoritesService.remove(req.user._id, productId);
  }
}