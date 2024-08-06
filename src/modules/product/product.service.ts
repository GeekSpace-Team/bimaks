import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductGroup } from '../product-group/entities/product-group.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
    @InjectRepository(ProductGroup)
    private readonly groupRepo: Repository<ProductGroup>,
  ) {}

  async create(createProductDto: CreateProductDto, image: string) {
    const product = new Product();
    product.desc_en = createProductDto.desc_en;
    product.desc_ru = createProductDto.desc_ru;
    product.desc_tm = createProductDto.desc_tm;
    product.image = image;
    product.short_en = createProductDto.short_en;
    product.short_ru = createProductDto.short_ru;
    product.short_tm = createProductDto.short_tm;
    product.title_en = createProductDto.title_en;
    product.title_ru = createProductDto.title_ru;
    product.title_tm = createProductDto.title_tm;
    product.group = await this.groupRepo.findOneBy({
      id: createProductDto.group_id,
    });
    return await this.repo.save(product);
  }

  async findAll(group: number) {
    const products = await this.repo.find({
      order: {
        created_at: 'DESC',
      },
      where: {
        group: {
          id: group,
        },
      },
      relations: {
        group: true,
      },
    });
    return products.map((it) => ({
      ...it,
      image: `${process.env.BASE_URL}/${it.image}`,
    }));
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(id: number, body: CreateProductDto, image?: string) {
    const product = await this.repo.findOneBy({ id: id });
    if (body.desc_en) product.desc_en = body.desc_en;
    if (body.desc_ru) product.desc_ru = body.desc_ru;
    if (body.desc_tm) product.desc_tm = body.desc_tm;
    if (image) product.image = image;
    if (body.short_en) product.short_en = body.short_en;
    if (body.short_ru) product.short_ru = body.short_ru;
    if (body.short_tm) product.short_tm = body.short_tm;
    if (body.title_en) product.title_en = body.title_en;
    if (body.title_ru) product.title_ru = body.title_ru;
    if (body.title_tm) product.title_tm = body.title_tm;
    if (body.group_id)
      product.group = await this.groupRepo.findOneBy({
        id: body.group_id,
      });
    return await this.repo.update(id, product);
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}
