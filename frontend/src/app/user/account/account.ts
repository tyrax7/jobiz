import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/models/auth.model';

@Component({
  selector: 'app-account',
  imports: [RouterLink, NgIf],
  templateUrl: './account.html',
  styleUrl: './account.scss'
})
export class Account implements OnInit {
  user: User | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.loadCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Impossible de charger votre compte.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getCvFileName(): string {
    return this.user?.cvOriginalName || 'Aucun CV envoyé';
  }
}