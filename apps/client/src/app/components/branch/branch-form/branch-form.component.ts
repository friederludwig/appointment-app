import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Branch } from '@appointment-app-hdm/api-interfaces';
import { ButtonComponent } from '../../system/button/button.component';
import { UserService } from '../../../services/user/user.service';
import { validateUserPermissionsForBranch } from '@appointment-app-hdm/shared';

@Component({
  selector: 'app-branch-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './branch-form.component.html',
  styleUrls: ['./branch-form.component.scss'],
})
export class BranchFormComponent implements OnInit {
  @Input() title!: string;
  @Input() branch!: Branch | null;
  @Input() isDeleteButtonDisabled!: boolean;
  @Output() branchUpdated = new EventEmitter<Partial<Branch>>();
  @Output() branchCreated = new EventEmitter<Branch>();
  @Output() branchDeleted = new EventEmitter<Branch>();

  form!: FormGroup;
  userHasPermissions!: boolean;

  constructor(private location: Location, private userService: UserService) {}

  ngOnInit() {
    this.form = new FormGroup({
      city: new FormControl('', [Validators.required]),
      openingHoursStart: new FormControl('', [Validators.required]),
      openingHoursEnd: new FormControl('', [Validators.required]),
    });

    if (this.branch) {
      this.form.patchValue({
        city: this.branch.city,
        openingHoursStart: this.branch.openingHoursStart,
        openingHoursEnd: this.branch.openingHoursEnd,
      });
    }

    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {
      this.userHasPermissions = validateUserPermissionsForBranch(currentUser);
    }
  }

  submit() {
    if (this.form.valid) {
      const branchData = this.form.value;
      if (this.branch && this.branch.id) {
        this.branchUpdated.emit({
          id: this.branch.id,
          ...branchData,
        });
      } else {
        this.branchCreated.emit({
          id: 0, // id gets updated in backend
          ...branchData,
        });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  delete() {
    if (this.branch) {
      this.branchDeleted.emit(this.branch);
    }
  }

  fieldError(control: string) {
    return (
      this.form.get(control)?.invalid &&
      (this.form.get(control)?.touched || this.form.get(control)?.dirty)
    );
  }

  navigateBack(): void {
    this.location.back();
  }
}
