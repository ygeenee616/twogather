import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { NoticesService } from './notices.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { NoticeResExample } from './notice.swagger.example';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/custom.decorator';
import { User } from 'src/users/entities/users.entity';

const noticeResExample = new NoticeResExample();

@Controller('api/notices')
@ApiTags('관리자 공지사항 API')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  // 공지사항 등록
  @Post()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '공지사항 등록 API',
    description: '공지사항을 작성한다.(관리자만 가능)',
  })
  @ApiResponse({
    status: 201,
    description: '공지사항 등록 성공',
    schema: {
      example: noticeResExample.create,
    },
  })
  async create(
    @GetUser() user: User,
    @Body() createNoticeDto: CreateNoticeDto,
  ) {
    if (!user.isAdmin) {
      throw new UnauthorizedException('관리자가 아닙니다.');
    }
    const newNotice = await this.noticesService.create(createNoticeDto, user);
    return {
      status: 201,
      description: '새로운 공지사항 등록 완료',
      success: true,
      data: newNotice,
    };
  }

  // 전체 공지사항 목록 조회
  @Get()
  @ApiOperation({
    summary: '공지사항 findAll API',
    description: '전체 공지사항 목록을 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description: '전체 공지사항 목록',
    schema: {
      example: noticeResExample.findAll,
    },
  })
  async findAll() {
    const notices = await this.noticesService.findAll();
    return {
      status: 200,
      description: '전체 공지사항 목록 조회 성공',
      success: true,
      data: notices,
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: '특정 공지사항을 가져오는 API',
    description: '공지사항Id로 특정 공지사항을 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description: '특정 공지사항',
    schema: {
      example: noticeResExample.findOne,
    },
  })
  async findOne(@Param('id') id: number) {
    const notice = await this.noticesService.findOne(+id);
    return {
      status: 200,
      success: true,
      description: '공지사항Id로 특정 공지사항 조회 성공',
      data: notice,
    };
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '특정 공지사항 수정 API',
    description: '공지사항 Id로 특정 공지사항을 수정한다.(관리자만 가능)',
  })
  @ApiResponse({
    status: 201,
    description: '수정된 공지사항',
    schema: {
      example: noticeResExample.updateNotice,
    },
  })
  async updateNotice(
    @GetUser() user: User,
    @Param('id') id: number,
    @Body() updateNoticeDto: UpdateNoticeDto,
  ) {
    if (!user.isAdmin) {
      throw new UnauthorizedException('관리자가 아닙니다.');
    }
    const updatedNotice = await this.noticesService.update(
      +id,
      updateNoticeDto,
    );
    return {
      status: 201,
      description: '공지사항Id로 특정 공지사항 수정',
      success: true,
      data: { affected: updatedNotice },
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '특정 공지사항 삭제 API',
    description: '공지사항Id로 특정 공지사항을 삭제한다.',
  })
  @ApiResponse({
    status: 201,
    description: '공지사항 삭제되었는 지',
    schema: {
      example: noticeResExample.removeNotice,
    },
  })
  async removeNotice(@GetUser() user: User, @Param('id') id: number) {
    if (!user.isAdmin) {
      throw new UnauthorizedException('관리자가 아닙니다.');
    }
    await this.noticesService.remove(+id);
    return {
      status: 201,
      description: '공지사항Id로 특정 공지사항 삭제 성공',
      success: true,
    };
  }
}
