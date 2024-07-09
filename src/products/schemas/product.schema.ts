// src/products/schemas/product.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schema/user.schema'

export type ProductDocument = Product & Document;

export enum Categories {
  PLANTS_AND_MACHINERIES = 'Plants & Machineries',
  PLOTS = 'Plots',
}

@Schema()
export class Product {
  @Prop({ required: true })
  productTitle: string;

  @Prop({ type: String, enum: Categories })
  category: Categories;

  @Prop()
  subCategories: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  price: number;

  @Prop()
  location: string;

  @Prop()
  industry: string;

  @Prop()
  isReviewed: boolean;

  
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  seller: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);