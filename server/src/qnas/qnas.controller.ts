import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QnasService } from './qnas.service';
import { CreateQnaDto } from './dto/create-qna.dto';
import { UpdateQnaDto } from './dto/update-qna.dto';

@Controller('qnas')
export class QnasController {
  constructor(private readonly qnasService: QnasService) {}

  @Post()
  create(@Body() createQnaDto: CreateQnaDto) {
    return this.qnasService.create(createQnaDto);
  }

  @Get()
  findAll() {
    return this.qnasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.qnasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQnaDto: UpdateQnaDto) {
    return this.qnasService.update(+id, updateQnaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.qnasService.remove(+id);
  }
}
