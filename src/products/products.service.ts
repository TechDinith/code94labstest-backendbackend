import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  //mongodb atlas
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  //using to store data in mongodb atlas
  async insertProduct(
    sku: String,
    name: String,
    description: String,
    price: Number,
    qty: Number,
    fav: Boolean,
    // img: {
    //   data: Buffer;
    //   contentType: String;
    // },
  ) {
    const newProduct = new this.productModel({
      sku,
      name,
      description,
      price,
      qty,
      fav,
      // img,
    });
    const result = await newProduct.save();
    console.log(result);
    return result.id as string;
  }

  // using for get data from mongodb atlas
  async getProducts() {
    const products = await this.productModel.find().exec();
    console.log(products);
    return products.map((prod) => ({
      id: prod.id,
      sku: prod.sku,
      name: prod.name,
      description: prod.description,
      price: prod.price,
      qty: prod.qty,
      fav: prod.fav,
    }));
  }

  // get a single product from mongodb atlas
  // async getSingleProduct(productId: string) {
  //   const product = await this.findProduct(productId);
  //   return {
  //     id: product.id,
  //     title: product.title,
  //     description: product.description,
  //     price: product.price,
  //   };
  // }

  //update data in mongodb atlas
  async updateProduct(
    productId: string,
    sku: String,
    name: String,
    description: String,
    price: Number,
    qty: Number,
    fav: Boolean,
  ) {
    const updatedProduct = await this.findProduct(productId);
    if (sku) {
      updatedProduct.sku = sku;
    }
    if (name) {
      updatedProduct.name = name;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    if (qty) {
      updatedProduct.qty = qty;
    }
    if (fav) {
      updatedProduct.fav = fav;
    }
    updatedProduct.save();
  }

  // delete data from mongodb atlas
  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({ _id: prodId }).exec();
    console.log(result);
    if (result.deletedCount === 0) {
      throw new NotFoundException('Cound not find product.!');
    }
  }

  //find product in mongodb atlas
  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Cound not find product.!');
    }
    if (!product) {
      throw new NotFoundException('Cound not find product.!');
    }
    return product;
  }
}
