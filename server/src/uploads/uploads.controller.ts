import {
  Controller,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadsService } from './uploads.service';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import { FilesInterceptor } from '@nestjs/platform-express';
import 'dotenv/config';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

const s3 = new AWS.S3();

@Controller('api/uploads')
@ApiTags('이미지 등록 API')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('/space/:spaceId')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('userToken')
  @ApiOperation({
    summary: '공간 이미지 등록 API',
    description: '공간 이미지 등록',
  })
  @ApiResponse({
    status: 201,
    description: '새 공간 이미지 등록 완료',
    schema: {
      example: {},
    },
  })
  @UseInterceptors(
    FilesInterceptor('images', 4, {
      storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
          cb(null, `images/${Date.now()}_${file.originalname}`);
        },
      }),
    }),
  )
  async uploadSpaceImage(
    @Param('spaceId') spaceId: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.uploadsService.uploadSpaceImage(spaceId, files);
  }

  @Post('/room')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('userToken')
  @ApiOperation({
    summary: '룸 이미지 등록 API',
    description: '룸 이미지 등록',
  })
  @ApiResponse({
    status: 201,
    description: '새 룸 이미지 등록 완료',
    schema: {
      example: {},
    },
  })
  @UseInterceptors(
    FilesInterceptor('images', 4, {
      storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
          cb(null, `images/${Date.now()}_${file.originalname}`);
        },
      }),
    }),
  )
  async uploadRoomImage(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.uploadsService.uploadRoomImage(files);
  }
}
