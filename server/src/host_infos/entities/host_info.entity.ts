import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/users.entity';

export class HostInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'businessNumber' })
  businessNumber: string;

  @Column({ type: 'varchar', length: 45, nullable: false })
  businessName: string;

  @Column({ type: 'varchar', length: 45, nullable: false })
  accountNumber: string;
}
