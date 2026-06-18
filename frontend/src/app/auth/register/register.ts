import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

import { AuthService } from '../services/auth.service';
import { RegisterRequest } from '../models/auth.model';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  form: RegisterRequest = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onSubmit(): void {
    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.authService.register(this.form).subscribe({
      next: () => {
        this.successMessage = 'Compte créé avec succès. Vous pouvez maintenant vous connecter.';
        this.isLoading = false;
        this.cdr.detectChanges();

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 800);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Erreur lors de l’inscription.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}