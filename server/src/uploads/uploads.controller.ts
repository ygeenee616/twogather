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
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import s3Storage = require('multer-sharp-s3');

const s3 = new AWS.S3();

@Controller('api/uploads')
@ApiTags('이미지 등록 API')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  // 리사이징 테스트
  @Post('/spacetest/:spaceId')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('userToken')
  @ApiOperation({
    summary: '공간 이미지 등록 API',
    description: '공간 이미지 등록',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: '새 공간 이미지 등록 완료',
    schema: {
      example: '2개의 spaceImage 파일이 업로드되었습니다.',
    },
  })
  @UseInterceptors(
    FilesInterceptor('images', 4, {
      storage: s3Storage({
        s3: s3,
        Bucket: process.env.AWS_BUCKET_NAME,
        ACL: 'public-read',
        Key: function (req, file, cb) {
          cb(null, `spaces/${Date.now()}_${file.originalname}`);
        },
        resize: {
          width: 900,
          height: 600,
        },
      }),
    }),
  )
  async uploadSpaceImageResizing(
    @Param('spaceId') spaceId: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.uploadsService.uploadSpaceImageResizing(spaceId, files);
  }

  @Post('/space/:spaceId')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('userToken')
  @ApiOperation({
    summary: '공간 이미지 등록 API',
    description: '공간 이미지 등록',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: '새 공간 이미지 등록 완료',
    schema: {
      example: '2개의 spaceImage 파일이 업로드되었습니다.',
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
          cb(null, `spaces/${Date.now()}_${file.originalname}`);
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

  @Post('/room/:roomId')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('userToken')
  @ApiOperation({
    summary: '룸 이미지 등록 API',
    description: '룸 이미지 등록',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: '새 룸 이미지 등록 완료',
    schema: {
      example: '2개의 roomImage 파일이 업로드되었습니다.',
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
          cb(null, `rooms/${Date.now()}_${file.originalname}`);
        },
      }),
    }),
  )
  async uploadRoomImage(
    @Param('roomId') roomId: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.uploadsService.uploadRoomImage(roomId, files);
  }

  @Post('/profile/:userId')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('userToken')
  @ApiOperation({
    summary: '프로필 이미지 등록 API',
    description: '프로필 이미지 등록',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: '새 프로필 이미지 등록 완료',
    schema: {
      example: '2개의 profileImage 파일이 업로드되었습니다.',
    },
  })
  @UseInterceptors(
    FilesInterceptor('images', 1, {
      storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
          cb(null, `profiles/${Date.now()}_${file.originalname}`);
        },
      }),
    }),
  )
  async uploadProfileImage(
    @Param('userId') userId: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.uploadsService.uploadProfileImage(userId, files);
  }
}
