import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Appointment, Branch } from '@appointment-app-hdm/api-interfaces';
import { Observable } from 'rxjs';
import { AppointmentsService } from '../../../services/appointments/appointments.service';
import { BranchesService } from '../../../services/branches/branches.service';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-appointment-detail-route',
  standalone: true,
  imports: [CommonModule, AppointmentFormComponent, RouterLink],
  templateUrl: './appointment-detail-route.component.html',
})
export class AppointmentDetailRouteComponent implements OnInit {
  appointment$!: Observable<Appointment>;
  branches$!: Observable<Branch[]>;
  @Input() id!: number;

  constructor(
    private appointmentsService: AppointmentsService,
    private branchesService: BranchesService,
    private router: Router,
    private readonly toastService: ToastService
  ) {}

  ngOnInit() {
    this.appointment$ = this.appointmentsService.getById(this.id);
    this.branches$ = this.branchesService.getAll();
  }

  onUpdate(updatedAppointment: Partial<Appointment>) {
    if (updatedAppointment.id) {
      this.appointmentsService
        .updateById(updatedAppointment.id, updatedAppointment)
        .subscribe();
    }
    this.toastService.showToast('Appointment geupdated.');
  }

  onDelete(id: number) {
    this.appointmentsService.deleteById(id).subscribe(() => {
      this.router.navigate(['/appointments']);
      this.toastService.showToast('Appointment gelöscht.');
    });
  }
}
