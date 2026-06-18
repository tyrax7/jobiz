import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

import { AuthService } from '../services/auth.service';
import { LoginRequest } from '../models/auth.model';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  form: LoginRequest = {
    email: '',
    password: ''
  };

  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.form).subscribe({
      next: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
        this.router.navigate(['/account']);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Erreur de connexion.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}