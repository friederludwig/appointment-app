import { Appointment } from '@appointment-app-hdm/api-interfaces';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppointmentEntity } from '../../entities/appointment.entity';
import { BranchService } from '../branch/branch.service';
import { isTimeInInterval } from '@appointment-app-hdm/shared';

@Injectable()
export class AppointmentService {
  constructor(
    @Inject('APPOINTMENT_REPOSITORY')
    private appointmentRepository: Repository<AppointmentEntity>,

    private branchService: BranchService
  ) {}

  async getAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      relations: ['branch'],
      order: {
        date: 'DESC',
      },
    });
  }

  async getById(id: number): Promise<Appointment> {
    return this.appointmentRepository.findOne({
      where: { id },
      relations: ['branch'],
    });
  }

  async create(createData: Partial<Appointment>): Promise<Appointment> {
    const branch = await this.branchService.getById(createData.branch.id);

    if (!branch) {
      throw new NotFoundException(
        `Branch with ID ${createData.branch} not found`
      );
    }

    const newAppointment = this.appointmentRepository.create({
      ...createData,
      branch,
    });

    return this.appointmentRepository.save(newAppointment);
  }

  async updateById(
    id: number,
    appointment: Partial<Appointment>
  ): Promise<Appointment> {
    const existingAppointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['branch'],
    });

    if (existingAppointment === undefined) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    if (appointment.branch === undefined) {
      throw new NotFoundException(
        `Branch with ID ${id} not found for Appointment`
      );
    }
    const branchId = appointment.branch.id;
    const branch = await this.branchService.getById(branchId);

    if (appointment.branch) {
      existingAppointment.branch = branch;
    }

    const updatedAppointment = this.appointmentRepository.merge(
      existingAppointment,
      {
        ...appointment,
        branch: existingAppointment.branch,
      }
    );

    if (
      false ===
      isTimeInInterval(
        updatedAppointment.time,
        branch.openingHoursStart,
        branch.openingHoursEnd
      )
    ) {
      throw new Error(
        `The time ${updatedAppointment.time} of the appointment is not within the opening hours (${branch.openingHoursStart} - ${branch.openingHoursEnd})`
      );
    }
    return this.appointmentRepository.save(updatedAppointment);
  }

  async deleteById(id: number): Promise<void> {
    const result = await this.appointmentRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
  }
}
