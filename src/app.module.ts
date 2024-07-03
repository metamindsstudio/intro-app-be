// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigModule available application-wide
    }),
    MongooseModule.forRoot("mongodb+srv://nitinshukla:3v12PsVCjHEJPq0W@cluster0.hwwk7wt.mongodb.net/intro"),
    UsersModule,
    AuthModule,
    ProductsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}