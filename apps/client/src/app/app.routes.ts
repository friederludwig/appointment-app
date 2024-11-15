import { Route } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { AppointmentListComponent } from './components/appointment/appointment-list/appointment-list.component';
import { AppointmentDetailRouteComponent } from './components/appointment/appointment-detail-route/appointment-detail-route.component';
import { AppointmentCreateRouteComponent } from './components/appointment/appointment-create-route/appointment-create-route.component';
import { AuthGuard } from './guards/auth.guard';
import { BranchListComponent } from './components/branch/branch-list/branch-list.component';
import { BranchDetailRouteComponent } from './components/branch/branch-detail-route/branch-detail-route.component';
import { BranchCreateRouteComponent } from './components/branch/branch-create-route/branch-create-route.component';

export const appRoutes: Route[] = [
  {
    path: 'appointments',
    component: AppointmentListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'appointments/create',
    component: AppointmentCreateRouteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'appointments/:id',
    component: AppointmentDetailRouteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'branches',
    component: BranchListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'branches/create',
    component: BranchCreateRouteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'branches/:id',
    component: BranchDetailRouteComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/appointments', pathMatch: 'full' },
];
