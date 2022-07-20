import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { SpacesService } from 'src/spaces/spaces.service';
import { SpaceImagesService } from 'src/space_images/space_images.service';

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
    private spaceService: SpacesService,
  ) {}

  async uploadSpaceImage(spaceId: number, files: Array<Express.Multer.File>) {
    try {
      console.log(multerS3.AUTO_CONTENT_TYPE);
      console.log(files[0].buffer);
      for (let i = 0; i < files.length; i++) {
        const now = Date.now();
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Body: files[i].buffer,
          ContentType: 'image/png',
          ACL: 'public-read',
          Key: `images/${now}_${files[i].originalname}`,
        };
        await s3.putObject(params).promise().then();
        const awsAddress = process.env.AWS_S3_URL;
        const spaceImage = await this.spaceImageService.create(
          {
            imageUrl: `${awsAddress}${now}_${files[i].originalname}`,
          },
          spaceId,
        );
      }
      return `${files.length}개의 파일이  업로드되었습니다.`;
    } catch (error) {
      throw error;
    }
  }

  async uploadRoomImage(files: Array<Express.Multer.File>) {}
}
