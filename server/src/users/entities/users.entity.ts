import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45, nullable: false, unique: true })
  nickname: string;

  @Column({ type: 'varchar', length: 45, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 45, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  sex: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  profileImage: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  businessNumber: string;
}
