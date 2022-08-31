import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      //mongo url
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
