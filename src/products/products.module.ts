import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './product.model';
import { ProductsController } from './products.controller';
import { ProductService } from './products.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    // MulterModule.register({ dest: './images' }),
  ],
  controllers: [ProductsController],
  providers: [ProductService],
})
export class ProductsModule {}
