import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45, nullable: false })
  nickname: string;

  @Column({ type: 'varchar', length: 45, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 45, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 45 })
  name: string;

  @Column({ type: 'varchar', length: 45 })
  sex: string;

  @Column({ type: 'varchar', length: 45 })
  profileImage: string;

  @Column({ type: 'varchar', length: 45 })
  phoneNumber: string;
}
