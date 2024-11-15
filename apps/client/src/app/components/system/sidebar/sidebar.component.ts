import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '@appointment-app-hdm/api-interfaces';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  navigation = [
    {
      id: 0,
      route: '/appointments',
      title: 'Appointments',
    },
    {
      id: 1,
      route: '/branches',
      title: 'Branches',
    },
  ];
  currentUser!: User | null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
  }

  logout() {
    this.authService.clearToken();
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
