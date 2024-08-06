import { Injectable } from '@nestjs/common';
import { CreateProductGroupDto } from './dto/create-product-group.dto';
import { Repository } from 'typeorm';
import { ProductGroup } from './entities/product-group.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductGroupService {
  constructor(
    @InjectRepository(ProductGroup)
    private readonly repo: Repository<ProductGroup>,
  ) {}
  async create(body: CreateProductGroupDto, image: string) {
    const group = new ProductGroup();
    group.name_en = body.name_en;
    group.name_ru = body.name_ru;
    group.name_tm = body.name_tm;
    group.image = image;
    return await this.repo.save(group);
  }

  async findAll() {
    const groups = await this.repo.find({
      order: {
        created_at: 'DESC',
      },
    });
    return groups.map((it) => ({
      ...it,
      image: `${process.env.BASE_URL}/${it.image}`,
    }));
  }

  findOne(id: number) {
    return `This action returns a #${id} productGroup`;
  }

  async update(id: number, body: CreateProductGroupDto, image?: string) {
    const group = await this.repo.findOneBy({ id: id });
    if (body.name_en) group.name_en = body.name_en;
    if (body.name_ru) group.name_ru = body.name_ru;
    if (body.name_tm) group.name_tm = body.name_tm;
    if (image) group.image = image;
    return await this.repo.update(id, group);
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}
