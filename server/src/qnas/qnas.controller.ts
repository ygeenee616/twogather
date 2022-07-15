import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QnasService } from './qnas.service';
import { CreateQnaDto } from './dto/create-qna.dto';
import { UpdateQnaDto } from './dto/update-qna.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { Qna } from './entities/qna.entity';

@Controller('qnas')
@ApiTags('Q&A API')
@ApiHeader({
  name: 'authorization',
  description: 'Auth token',
}) // 사용자 정의 헤더인데, 추후 token 필요한 곳에 추가하기
export class QnasController {
  constructor(private readonly qnasService: QnasService) {}

  @Post()
  @ApiOperation({ summary: 'Q&A 생성 API', description: 'Q&A를 생성한다.' })
  @ApiResponse({ status: 201, description: '생성된 Q&A', type: Qna })
  create(@Body() createQnaDto: CreateQnaDto) {
    return this.qnasService.create(createQnaDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Q&A findAll API',
    description: '전체 Q&A 목록을 불러온다.',
  })
  @ApiResponse({ status: 200, description: '전체 Q&A 목록', type: Qna })
  findAll() {
    return this.qnasService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '특정 Q&A 찾는 API',
    description: 'Q&A의 ID로 특정 Q&A를 불러온다.',
  })
  @ApiResponse({ status: 200, description: '특정 Q&A', type: Qna })
  findOne(@Param('id') id: string) {
    return this.qnasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '특정 Q&A 수정 API',
    description: 'Q&A의 ID로 특정 Q&A를 수정한다.',
  })
  @ApiResponse({ status: 200, description: '수정된 Q&A', type: Qna })
  update(@Param('id') id: string, @Body() updateQnaDto: UpdateQnaDto) {
    return this.qnasService.update(+id, updateQnaDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '특정 Q&A 삭제 API',
    description: 'Q&A의 ID로 특정 Q&A를 삭제한다.',
  })
  @ApiResponse({ status: 200, description: '삭제된 Q&A', type: Qna })
  remove(@Param('id') id: string) {
    return this.qnasService.remove(+id);
  }
}
