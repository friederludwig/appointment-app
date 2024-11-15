import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../system/button/button.component';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  invalidCredentialsMessage!: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit(): void {
    if (this.form.valid) {
      const loginData = this.form.value;
      this.userService.login(loginData).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/appointments']);
        },
        error: (err) => {
          if (err?.status === 401 || err?.status === 404) {
            this.invalidCredentialsMessage = 'Wrong email or password';
          }
          console.error('Login failed:', err);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  fieldError(control: string) {
    return (
      this.form.get(control)?.invalid &&
      (this.form.get(control)?.touched || this.form.get(control)?.dirty)
    );
  }
}
