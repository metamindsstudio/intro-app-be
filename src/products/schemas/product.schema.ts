// src/products/schemas/product.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schema/user.schema'

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  productTitle: string;

  @Prop()
  category: string;

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
  seller: User;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);