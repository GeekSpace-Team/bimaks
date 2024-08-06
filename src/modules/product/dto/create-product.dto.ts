import { IsAlphanumeric, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title_tm: string;
  @IsNotEmpty()
  @IsString()
  title_en: string;
  @IsNotEmpty()
  @IsString()
  title_ru: string;
  @IsNotEmpty()
  @IsString()
  short_tm: string;
  @IsNotEmpty()
  @IsString()
  short_en: string;
  @IsNotEmpty()
  @IsString()
  short_ru: string;
  @IsNotEmpty()
  @IsString()
  desc_tm: string;
  @IsNotEmpty()
  @IsString()
  desc_en: string;
  @IsNotEmpty()
  @IsString()
  desc_ru: string;
  @IsNotEmpty()
  @IsAlphanumeric()
  group_id: number;
}
