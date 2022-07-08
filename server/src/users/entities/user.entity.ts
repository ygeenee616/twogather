import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column()
  phoneNumber: string;
}
