import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AppointmentEntity } from './appointment.entity';

@Entity('branch')
export class BranchEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  city: string;

  @Column()
  openingHoursStart: string;

  @Column()
  openingHoursEnd: string;

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.branch)
  appointments?: AppointmentEntity[];
}
