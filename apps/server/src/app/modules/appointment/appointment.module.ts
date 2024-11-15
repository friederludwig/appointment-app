import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { BranchModule } from '../branch/branch.module';
import { DatabaseModule } from '../db/database.module';
import { AppointmentController } from './appointment.controller';
import { appointmentProviders } from './appointment.provider';
import { AppointmentService } from './appointment.service';

@Module({
  imports: [DatabaseModule, BranchModule, forwardRef(() => AuthModule)],
  controllers: [AppointmentController],
  providers: [AppointmentService, ...appointmentProviders],
  exports: [AppointmentService, ...appointmentProviders],
})
export class AppointmentModule {}
