import { Space } from 'src/spaces/entities/spaces.entity';
import { User } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Qna {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 400 })
  content: string;

  @Column({ type: 'varchar', length: 400 })
  reply: string;

  @ManyToOne(() => Space)
  @JoinColumn({ name: 'spaceId', referencedColumnName: 'id' })
  space: Space;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}
