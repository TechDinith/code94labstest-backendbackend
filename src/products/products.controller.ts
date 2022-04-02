import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import {
  AnyFilesInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { ProductService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  // insert data to mongodb atlas
  @Post()
  // @UseInterceptors(AnyFilesInterceptor())
  async addProduct(
    @Body('sku') prodSku: string,
    @Body('name') prodName: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    @Body('qty') prodQty: number,
    // @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const generatedId = await this.productService.insertProduct(
      prodSku,
      prodName,
      prodDesc,
      prodPrice,
      prodQty,
      // files,
    );
    // console.log('files', files);
    return { id: generatedId };
  }

  //todo:multer image upload
  // @Post('upload')
  // @UseInterceptors(AnyFilesInterceptor())
  // uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
  //   console.log(files);
  // }

  // get data from mongodb
  @Get()
  async getAllProducts() {
    const products = await this.productService.getProducts();
    return products;
  }

  // @Get(':id')
  // getProduct(@Param('id') prodId: string) {
  //   return this.productService.getSingleProduct(prodId);
  // }

  //update data in mongoddb atlas
  // @Patch(':id')
  // async updateProduct(
  //   @Param('id') prodId: string,
  //   @Body('title') prodTitle: string,
  //   @Body('description') prodDesc: string,
  //   @Body('price') prodPrice: number,
  // ) {
  //   await this.productService.updateProduct(
  //     prodId,
  //     prodTitle,
  //     prodDesc,
  //     prodPrice,
  //   );
  //   return null;
  // }

  //delete data from mongodb atals
  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productService.deleteProduct(prodId);
    return null;
  }
}
