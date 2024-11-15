import { User } from '@appointment-app-hdm/api-interfaces';
import {
  validateUserPermissionsForAppointment,
  validateUserPermissionsForBranch,
} from '@appointment-app-hdm/shared';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppointmentService } from '../appointment/appointment.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private appointmentService: AppointmentService
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findOneByEmail(email);
    if (user && pass === user.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      role: user.role,
      username: user.username,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateOwnership(
    token: string,
    entityId: number,
    entityType: 'appointment' | 'branch'
  ) {
    const decodedUser = this.jwtService.decode(token) as User;

    if (!decodedUser || typeof decodedUser !== 'object') {
      throw new UnauthorizedException('Invalid token');
    }

    // Appointment validation
    if (entityType === 'appointment') {
      const appointment = await this.appointmentService.getById(entityId);
      if (!appointment) {
        throw new UnauthorizedException('Appointment not found');
      }
      const isValid = validateUserPermissionsForAppointment(
        appointment,
        decodedUser
      );

      if (!isValid) {
        throw new UnauthorizedException(
          'You are not authorized to update this appointment'
        );
      }
    }
    // Branch validation
    if (entityType === 'branch') {
      const isValid = validateUserPermissionsForBranch(decodedUser);
      if (!isValid) {
        throw new UnauthorizedException(
          'Only admins are authorized to update branches'
        );
      }
    }
    return true;
  }

  getRequestToken(authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }
    return authHeader.split(' ')[1];
  }
}
