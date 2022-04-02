import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://mernApp:cq0QKbZKVLhWWOD7@cluster0.joocg.mongodb.net/code94test?retryWrites=true&w=majority ',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
