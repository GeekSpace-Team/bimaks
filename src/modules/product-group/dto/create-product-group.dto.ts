import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductGroupDto {
  @IsNotEmpty()
  @IsString()
  name_tm: string;
  @IsNotEmpty()
  @IsString()
  name_en: string;
  @IsNotEmpty()
  @IsString()
  name_ru: string;
}
