import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ProductGroupModule } from './modules/product-group/product-group.module';
import { ProductGroup } from './modules/product-group/entities/product-group.entity';
import { ProductModule } from './modules/product/product.module';
import { Product } from './modules/product/entities/product.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', ''),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'QwertyWeb123',
      database: 'bimaks',
      entities: [ProductGroup, Product],
      synchronize: true,
      logging: true,
    }),
    ProductGroupModule,
    ProductModule,
  ],
})
export class AppModule {}
