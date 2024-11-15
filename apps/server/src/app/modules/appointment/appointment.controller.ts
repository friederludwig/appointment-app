import { Appointment } from '@appointment-app-hdm/api-interfaces';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AppointmentService } from './appointment.service';

@Controller('appointment')
export class AppointmentController {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly authService: AuthService
  ) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  GetData() {
    return this.appointmentService.getAll();
  }
  @Get(':id')
  GetById(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.getById(id);
  }

  @Post()
  async createAppointment(
    @Body() body: { appointment: Partial<Appointment> }
  ): Promise<Appointment> {
    const appointmentData = body.appointment;
    return this.appointmentService.create(appointmentData);
  }

  @Patch(':id')
  async PatchById(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAppointment: Partial<Appointment>
  ) {
    const token = this.authService.getRequestToken(req.headers.authorization);
    await this.authService.validateOwnership(token, id, 'appointment');
    return this.appointmentService.updateById(id, updateAppointment);
  }

  @Delete(':id')
  DeleteById(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.deleteById(id);
  }
}
