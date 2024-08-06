import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductGroupService } from './product-group.service';
import { CreateProductGroupDto } from './dto/create-product-group.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('product-group')
export class ProductGroupController {
  constructor(private readonly productGroupService: ProductGroupService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'upload',
        filename: editFileName,
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductGroupDto: CreateProductGroupDto,
  ) {
    return this.productGroupService.create(createProductGroupDto, file.path);
  }

  @Get()
  findAll() {
    return this.productGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productGroupService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'upload',
        filename: editFileName,
      }),
    }),
  )
  update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body() updateProductGroupDto: CreateProductGroupDto,
  ) {
    return this.productGroupService.update(
      +id,
      updateProductGroupDto,
      file.path,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productGroupService.remove(+id);
  }
}

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};
