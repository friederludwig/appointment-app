import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BranchEntity } from './branch.entity';
@Entity('appointment')
export class AppointmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'text' })
  time: string;

  @Column({ type: 'text' })
  status: string;

  @Column({ type: 'text' })
  vehicleRegNo: string;

  @Column({ type: 'text' })
  vehicleOwner: string;

  @Column({ type: 'text' })
  assignment: string;

  @Column({ type: 'int' })
  createdByUser: number;

  @ManyToOne(() => BranchEntity, (branch) => branch.appointments)
  branch: BranchEntity;
}
