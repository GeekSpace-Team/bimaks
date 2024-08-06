import { ProductGroup } from 'src/modules/product-group/entities/product-group.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title_tm: string;

  @Column()
  title_en: string;

  @Column()
  title_ru: string;

  @Column()
  short_tm: string;

  @Column()
  short_en: string;

  @Column()
  short_ru: string;

  @Column()
  desc_tm: string;

  @Column()
  desc_en: string;

  @Column()
  desc_ru: string;

  @Column()
  image: string;

  @ManyToOne(() => ProductGroup, (group) => group.product, {
    onDelete: 'CASCADE',
  })
  group: ProductGroup;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
