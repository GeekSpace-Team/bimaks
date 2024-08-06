import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductGroup } from '../product-group/entities/product-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductGroup])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
