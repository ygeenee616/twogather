import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { QnasService } from './qnas.service';
import { CreateQnaDto } from './dto/create-qna.dto';
import { UpdateQnaDto } from './dto/update-qna.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiHeader,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Qna } from './entities/qna.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetAdminUser, GetUser } from 'src/custom.decorator';
import { QnaResExample } from './qna.swagger.example';
import { User } from 'src/users/entities/users.entity';
const qnaResExample = new QnaResExample();

@Controller('api/qnas')
@ApiTags('Q&A API')
export class QnasController {
  constructor(private readonly qnasService: QnasService) {}

  // Q&A 등록
  @Post(':spaceId')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('userToken')
  @ApiOperation({
    summary: 'Q&A 작성 API',
    description: 'Q&A를 작성한다.(로그인한 유저만 가능)',
  })
  @ApiResponse({
    status: 201,
    description: '생성된 Q&A',
    schema: {
      example: qnaResExample.create,
    },
  })
  @ApiBearerAuth('userToken')
  async create(
    @GetUser() user,
    @Body() createQnaDto: CreateQnaDto,
    @Param('spaceId') spaceId: number,
  ) {
    const newQna = await this.qnasService.create(createQnaDto, user, spaceId);
    return {
      status: 201,
      description: '새로운 Q&A 작성 완료',
      success: true,
      data: newQna,
    };
  }

  // 전체 Q&A 목록 조회
  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Q&A findAll API',
    description: '전체 Q&A 목록을 불러온다.(admin)',
  })
  @ApiResponse({
    status: 200,
    description: '전체 Q&A 목록',
    schema: {
      example: qnaResExample.findAll,
    },
  })
  @ApiBearerAuth('userToken')
  async findAll(@GetAdminUser() admin: User) {
    const qnas = await this.qnasService.findAll();
    return {
      status: 200,
      description: '전체 Q&A 목록 조회 성공',
      success: true,
      data: qnas,
    };
  }

  // 특정 space의 Q&A 목록 조회
  @Get('space/:spaceId')
  @ApiOperation({
    summary: '특정 공간의 Q&A 목록 조회 API',
    description:
      '전체 Q&A 목록을 불러온다. 페이지네이션 가능(localhost:3000/api/qnas/space/1?page=1&perPage=5)',
  })
  @ApiResponse({
    status: 200,
    description: '특정 공간의 Q&A 목록 조회',
    schema: {
      example: qnaResExample.findAllBySpace,
    },
  })
  async findAllBySpace(@Param('spaceId') spaceId: number, @Query() query) {
    const { page, perPage } = query;
    if (!query || query === undefined || query === null) {
      const qnas = this.qnasService.findBySpace(spaceId);
      return {
        status: 200,
        description: '특정 공간의 Q&A 목록 조회 성공',
        success: true,
        data: {
          qnas,
        },
      };
    }
    const startIndex: number = Number(perPage) * (Number(page) - 1);
    const { totalPage, paginatedQnas } =
      await this.qnasService.findBySpacePaginated(
        spaceId,
        startIndex,
        Number(perPage),
      );
    return {
      status: 200,
      description: '특정 공간의 Q&A 목록 조회 성공',
      success: true,
      data: {
        totalPage,
        paginatedQnas,
      },
    };
  }

  //qna Id로 조회
  @Get(':id')
  @ApiOperation({
    summary: '특정 Q&A 찾는 API',
    description: 'Q&A의 ID로 특정 Q&A를 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description: '특정 Q&A',
    schema: {
      example: qnaResExample.findOne,
    },
  })
  async findOne(@Param('id') id: number) {
    const qna = await this.qnasService.findOne(+id);
    return {
      status: 200,
      success: true,
      description: 'qnaId로 qna 조회 성공',
      data: qna,
    };
  }

  // qnaId로 특정 Q&A 수정
  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('userToken')
  @ApiOperation({
    summary: '특정 Q&A 수정 API(호스트가 답글다는 API)',
    description: 'Q&A의 ID로 특정 Q&A를 수정한다.',
  })
  @ApiResponse({
    status: 201,
    description: '수정된 Q&A',
    schema: {
      example: qnaResExample.updateQna,
    },
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Auth token',
  })
  async updateQna(
    @Param('id') id: number,
    @Body() updateQnaDto: UpdateQnaDto,
    @GetUser() host: User,
  ) {
    const qna = await this.qnasService.findOne(id);
    if (host.id !== qna.space.user.id) {
      throw new UnauthorizedException('권한 없음');
    }

    const updatedQna = await this.qnasService.update(id, updateQnaDto);
    return {
      status: 201,
      description: 'qnaId로 특정 Q&A 수정',
      success: true,
      data: { affected: updatedQna },
    };
  }

  // 내가 작성한 특정 Q&A 수정
  @Patch('mypage/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('userToken')
  @ApiOperation({
    summary: '내가 작성한 특정 Q&A 수정 API(유저가 자신의 Q&A 수정)',
    description: 'Q&A의 ID로 내가 작성한 특정 Q&A를 수정한다.',
  })
  @ApiResponse({
    status: 201,
    description: '수정된 Q&A',
    schema: {
      example: qnaResExample.updateMyQna,
    },
  })
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  })
  async updateMyQna(
    @Param('id') id: number,
    @Body() updateQnaDto: UpdateQnaDto,
    @GetUser() user: User,
  ) {
    const qna = await this.qnasService.findOne(id);
    if (qna.user.id !== user.id) {
      throw new UnauthorizedException('권한 없음');
    }
    const updatedQna = await this.qnasService.update(id, updateQnaDto);
    return {
      status: 201,
      description: 'qnaId로 내가 작성한 특정 Q&A 수정',
      success: true,
      data: { affected: updatedQna },
    };
  }

  // qnaId로 특정 Q&A 삭제
  @Delete(':id')
  @ApiOperation({
    summary: '특정 Q&A 삭제 API',
    description: 'Q&A의 ID로 특정 Q&A를 삭제한다.',
  })
  @ApiResponse({
    status: 201,
    description: '삭제된 Q&A',
    schema: {
      example: qnaResExample.removeQna,
    },
  })
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  })
  async removeQna(@Param('id') id: number) {
    await this.qnasService.remove(id);
    return {
      status: 201,
      description: 'qnaId로 특정 Q&A 삭제 성공',
      success: true,
    };
  }

  // qnaId로 내가 작성한 특정 Q&A 삭제
  @Delete('mypage/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('userToken')
  @ApiOperation({
    summary: '내가 작성한 특정 Q&A 삭제 API',
    description: 'Q&A ID로 내가 작성한 특정 Q&A를 삭제한다.',
  })
  @ApiResponse({
    status: 201,
    description: '삭제된 Q&A',
    schema: {
      example: qnaResExample.removeQna,
    },
  })
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  })
  async removeMyQna(@Param('id') id: number, @GetUser() user: User) {
    const qna = await this.qnasService.findOne(id);
    if (qna.user.id !== user.id) {
      throw new UnauthorizedException('권한 없음');
    }
    await this.qnasService.remove(id);
    return {
      status: 201,
      description: 'qnaId로 내가 작성한 특정 Q&A 삭제 성공',
      success: true,
    };
  }
}
