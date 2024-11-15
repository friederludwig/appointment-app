import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  Appointment,
  AppointmentStatusOptions,
  Branch,
} from '@appointment-app-hdm/api-interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppointmentsService } from '../../../services/appointments/appointments.service';
import { BranchesService } from '../../../services/branches/branches.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss'],
})
export class AppointmentListComponent implements OnInit {
  appointments$!: Observable<Appointment[]>;

  branches: Branch[] = [];
  selectedBranch: string | false = false;

  states = AppointmentStatusOptions;
  selectedStatus: AppointmentStatusOptions | false = false;

  selectedCreator: number | false = false;

  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly branchesService: BranchesService,
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedBranch = params['branch'] || false;
      this.selectedStatus = params['status'] || false;
      this.selectedCreator = params['creator'] || false;
      this.loadAppointments();
    });

    this.branchesService.getAll().subscribe((branches) => {
      this.branches = branches;
    });
  }

  filterAppointments(
    appointments: Appointment[],
    branch: string | false,
    status: string | false,
    creator: number | false
  ): Appointment[] {
    return appointments.filter((appointment) => {
      const matchesBranch = !branch || appointment.branch.city == branch;
      const matchesStatus = !status || appointment.status === status;
      const matchesCreator =
        !creator || appointment.createdByUser === Number(creator);
      return matchesBranch && matchesStatus && matchesCreator;
    });
  }

  loadAppointments() {
    this.appointments$ = this.appointmentsService
      .getAll()
      .pipe(
        map((appointments) =>
          this.filterAppointments(
            appointments,
            this.selectedBranch,
            this.selectedStatus,
            this.selectedCreator
          )
        )
      );
  }

  onBranchFilterChange(branch?: string | false) {
    this.selectedBranch = branch ? branch : false;
    this.updateUrlParams();
  }

  onStatusFilterChange(status: AppointmentStatusOptions | false) {
    this.selectedStatus = status;
    this.updateUrlParams();
  }

  onCreatorFilterChange(showOwn: boolean) {
    const userId = this.userService.getCurrentUser()?.id;

    if (userId) {
      this.selectedCreator = showOwn ? userId : false;
      this.updateUrlParams();
    }
  }

  updateUrlParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        branch: this.selectedBranch !== false ? this.selectedBranch : null,
        status: this.selectedStatus !== false ? this.selectedStatus : null,
        creator: this.selectedCreator !== false ? this.selectedCreator : null,
      },
      queryParamsHandling: 'merge', // keep existing params
    });
  }

  getStatusCssClass(value: string) {
    return value.replace(/\s+/g, '').toLowerCase();
  }
}
