import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { RoomImagesService } from 'src/room_images/room_images.service';
import { SpaceImagesService } from 'src/space_images/space_images.service';
import { UsersService } from 'src/users/users.service';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

const s3 = new AWS.S3();

@Injectable()
export class UploadsService {
  constructor(
    private spaceImageService: SpaceImagesService,
    private userService: UsersService,
    private roomImageService: RoomImagesService,
  ) {}

  /* async uploadSpaceImageResizing(spaceId: number, files: Array<any>) {
    try {
      console.log(files);
      for (let i = 0; i < files.length; i++) {
        const now = Date.now();
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Body: files[i].buffer,
          ContentType: 'image/png',
          ACL: 'public-read',
          Key: `images/${now}_${files[i].originalname}`,
        };
        // await s3.putObject(params).promise().then();
        const awsAddress = process.env.AWS_S3_URL;
        const spaceImage = await this.spaceImageService.create(
          {
            imageUrl: files[i].Location,
          },
          spaceId,
        );
      }
      return `${files.length}개의 spaceImage 파일이 업로드되었습니다.`;
    } catch (error) {
      throw error;
    }
  } */

  async uploadSpaceImage(spaceId: number, files: Array<any>) {
    try {
      console.log(files);
      for (let i = 0; i < files.length; i++) {
        const now = Date.now();
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Body: files[i].buffer,
          ContentType: 'image/png',
          ACL: 'public-read',
          Key: `images/${now}_${files[i].originalname}`,
        };
        // await s3.putObject(params).promise().then();
        const awsAddress = process.env.AWS_S3_URL;
        const spaceImage = await this.spaceImageService.create(
          {
            imageUrl: files[i].location.replace('origin', 'w_900_h_600'),
          },
          spaceId,
        );
      }
      return `${files.length}개의 spaceImage 파일이 업로드되었습니다.`;
    } catch (error) {
      throw error;
    }
  }

  async updateSpaceImage(spaceId: number, files: Array<any>) {
    try {
      console.log(files);

      // 기존 것 삭제(DB)
      const removeUrl = await this.spaceImageService.removeBySpace(spaceId);
      console.log(removeUrl);

      // 기존 것 삭제(S3)
      for (let idx = 0; idx < removeUrl.length; idx++) {
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: decodeURIComponent(removeUrl[idx]).split('com/')[1],
        };
        await s3.deleteObject(params).promise().then();
      }

      for (let i = 0; i < files.length; i++) {
        const now = Date.now();
        // const params = {
        //   Bucket: process.env.AWS_BUCKET_NAME,
        //   Body: files[i].buffer,
        //   ContentType: 'image/png',
        //   ACL: 'public-read',
        //   Key: `images/${now}_${files[i].originalname}`,
        // };
        // await s3.putObject(params).promise().then();
        const awsAddress = process.env.AWS_S3_URL;

        // 새로운 것 DB에 추가
        const spaceImage = await this.spaceImageService.create(
          {
            imageUrl: files[i].location.replace('origin', 'w_900_h_600'),
          },
          spaceId,
        );
      }
      return `${removeUrl.length}개의 기존 spaceImage 파일이 삭제되었습니다.
      ${files.length}개의 spaceImage 파일이 업로드되었습니다.`;
    } catch (error) {
      throw error;
    }
  }

  async uploadRoomImage(roomId: number, files: Array<any>) {
    try {
      console.log(files);
      for (let i = 0; i < files.length; i++) {
        const now = Date.now();
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Body: files[i].buffer,
          ContentType: 'image/png',
          ACL: 'public-read',
          Key: `images/${now}_${files[i].originalname}`,
        };
        // await s3.putObject(params).promise().then();
        const awsAddress = process.env.AWS_S3_URL;
        const spaceImage = await this.roomImageService.create(
          {
            imageUrl: files[i].location.replace('origin', 'w_900_h_600'),
          },
          roomId,
        );
      }
      return `${files.length}개의 roomImage 파일이 업로드되었습니다.`;
    } catch (error) {
      throw error;
    }
  }

  async updateRoomImage(roomId: number, files: Array<any>) {
    try {
      console.log(files);

      // 기존 것 삭제(DB)
      const removeUrl = await this.roomImageService.removeByRoom(roomId);
      console.log(removeUrl);

      // 기존 것 삭제(S3)
      for (let idx = 0; idx < removeUrl.length; idx++) {
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: decodeURIComponent(removeUrl[idx]).split('com/')[1],
        };
        await s3.deleteObject(params).promise().then();
      }

      for (let i = 0; i < files.length; i++) {
        const now = Date.now();
        // const params = {
        //   Bucket: process.env.AWS_BUCKET_NAME,
        //   Body: files[i].buffer,
        //   ContentType: 'image/png',
        //   ACL: 'public-read',
        //   Key: `images/${now}_${files[i].originalname}`,
        // };
        // await s3.putObject(params).promise().then();
        const awsAddress = process.env.AWS_S3_URL;

        // 새로운 것 DB에 추가
        const roomImage = await this.roomImageService.create(
          {
            imageUrl: files[i].location.replace('origin', 'w_900_h_600'),
          },
          roomId,
        );
      }
      return `${removeUrl.length}개의 기존 spaceImage 파일이 삭제되었습니다.
      ${files.length}개의 spaceImage 파일이 업로드되었습니다.`;
    } catch (error) {
      throw error;
    }
  }

  async uploadProfileImage(userId: number, files: Array<any>) {
    try {
      console.log(files);
      for (let i = 0; i < files.length; i++) {
        const now = Date.now();
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Body: files[i].buffer,
          ContentType: 'image/png',
          ACL: 'public-read',
          Key: `images/${now}_${files[i].originalname}`,
        };
        // await s3.putObject(params).promise().then();
        const awsAddress = process.env.AWS_S3_URL;
        const updatedUser = await this.userService.update(userId, {
          profileImage: files[i].location.replace('origin', 'wh_200'),
        });
      }
      return `${files.length}개의 profileImage 파일이 업로드되었습니다.`;
    } catch (error) {
      throw error;
    }
  }
}
