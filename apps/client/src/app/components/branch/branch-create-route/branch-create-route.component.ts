import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BranchesService } from '../../../services/branches/branches.service';
import { Branch } from '@appointment-app-hdm/api-interfaces';
import { BranchFormComponent } from '../branch-form/branch-form.component';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-branch-create-route',
  standalone: true,
  imports: [CommonModule, BranchFormComponent],
  templateUrl: './branch-create-route.component.html',
  styleUrl: './branch-create-route.component.scss',
})
export class BranchCreateRouteComponent {
  constructor(
    private readonly branchesService: BranchesService,
    private router: Router,
    private readonly toastService: ToastService
  ) {}

  onCreate(candidate: Branch) {
    this.branchesService.create(candidate).subscribe((newBranch) => {
      this.router.navigate([`/branches/${newBranch.id}`]);
      this.toastService.showToast('Branch gespeichert.');
    });
  }
}
