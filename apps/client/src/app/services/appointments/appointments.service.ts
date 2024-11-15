import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '@appointment-app-hdm/api-interfaces';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getAll() {
    return this.httpClient.get<Appointment[]>(`/api/appointment`);
  }

  getById(id: number) {
    return this.httpClient.get<Appointment>(`/api/appointment/${id}`);
  }

  create(appointment: Appointment) {
    return this.httpClient.post<Appointment>('/api/appointment', {
      appointment,
    });
  }

  updateById(id: number, updateData: Partial<Appointment>) {
    return this.httpClient.patch<Appointment>(
      `/api/appointment/${id}`,
      updateData
    );
  }
  deleteById(id: number) {
    return this.httpClient.delete<void>(`/api/appointment/${id}`);
  }
}
