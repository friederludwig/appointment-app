import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchesService } from '../../../services/branches/branches.service';
import { Branch } from '@appointment-app-hdm/api-interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-branch-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './branch-list.component.html',
  styleUrl: './branch-list.component.scss',
})
export class BranchListComponent implements OnInit {
  branches!: Branch[];
  constructor(private readonly branchesService: BranchesService) {}

  ngOnInit() {
    this.branchesService.getAll().subscribe((branches) => {
      console.log(branches);
      this.branches = branches;
    });
  }
}
