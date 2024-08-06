import { Product } from 'src/modules/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProductGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name_tm: string;

  @Column()
  name_en: string;

  @Column()
  name_ru: string;

  @Column()
  image: string;

  @OneToMany(() => Product, (product) => product.group, {
    onDelete: 'CASCADE',
  })
  product?: Product[];

  @CreateDateColumn()
  created_at: Date;
}
