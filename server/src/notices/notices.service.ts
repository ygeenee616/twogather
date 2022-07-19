import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { Notice } from './entities/notice.entity';

@Injectable()
export class NoticesService {
  constructor(
    @InjectRepository(Notice) private noticesRepository: Repository<Notice>,
  ) {}

  async create(createNoticeDto: CreateNoticeDto, user: User) {
    try {
      const newNotice = {
        ...createNoticeDto,
        user,
      };
      return await this.noticesRepository.save(newNotice);
    } catch (error) {
      throw error;
    }
  }

  async findAll(startIndex: number, perPage: number) {
    try {
      const [notices, noticeLength] =
        await this.noticesRepository.findAndCount();
      const totlaPage = Math.ceil(noticeLength / perPage);
      const paginatedNotices = await this.noticesRepository.find({
        order: {
          id: 'DESC',
        },
        skip: startIndex,
        take: perPage,
      });
      return { totlaPage, paginatedNotices };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const notice = await this.noticesRepository.findOne({
        where: {
          id,
        },
      });
      if (notice === null) {
        throw new NotFoundException('존재하지 않는 공지사항입니다.');
      }
      return notice;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateNoticeDto: UpdateNoticeDto) {
    try {
      const updatedNotice = await this.noticesRepository.update(
        id,
        updateNoticeDto,
      );
      return updatedNotice.affected === 1;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const deletedNotice = await this.noticesRepository.delete(id);
      if (!deletedNotice.affected) {
        throw new NotFoundException('삭제할 공지사항이 없습니다.');
      }
    } catch (error) {
      throw error;
    }
  }
}
