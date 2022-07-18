import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpacesService } from 'src/spaces/spaces.service';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateQnaDto } from './dto/create-qna.dto';
import { UpdateQnaDto } from './dto/update-qna.dto';
import { Qna } from './entities/qna.entity';

@Injectable()
export class QnasService {
  constructor(
    @InjectRepository(Qna) private qnasRepository: Repository<Qna>,
    private spaceService: SpacesService,
  ) {}

  async create(createQnaDto: CreateQnaDto, user: User, spaceId: number) {
    try {
      const space = await this.spaceService.findOne(spaceId);
      const newQna = {
        ...createQnaDto,
        space,
        user,
        createdTime: new Date(),
      };
      return await this.qnasRepository.save(newQna);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.qnasRepository.find({
      relations: {
        space: true,
        user: true,
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async findAllBySpace(spaceId: number, startIndex: number, perPage: number) {
    try {
      const totalQna = await this.qnasRepository.find({
        where: {
          space: {
            id: spaceId,
          },
        },
      });
      const totalPage = Math.ceil(totalQna.length / perPage);
      const paginatedQnas = await this.qnasRepository.find({
        where: {
          space: {
            id: spaceId,
          },
        },
        relations: {
          space: true,
          user: true,
        },
        order: {
          id: 'DESC',
        },
        skip: startIndex,
        take: perPage,
      });
      return { totalPage, paginatedQnas };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const qna = await this.qnasRepository.findOne({
        where: {
          id,
        },
        relations: {
          space: true,
          user: true,
        },
      });
      if (qna === null) {
        throw new NotFoundException('존재하지 않는 Q&A 입니다.');
      }
      return qna;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateQnaDto: UpdateQnaDto) {
    try {
      const updatedQna = await this.qnasRepository.update(id, updateQnaDto);
      return updatedQna.affected === 1;
    } catch (error) {
      throw error;
    }
  }

  // Q&A 삭제
  async remove(id: number) {
    try {
      const deletedQna = await this.qnasRepository.delete(id);
      if (!deletedQna.affected) {
        throw new NotFoundException('삭제할 qna가 없습니다.');
      }
    } catch (error) {
      throw error;
    }
  }
}
