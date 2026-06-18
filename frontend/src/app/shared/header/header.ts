import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/models/auth.model';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      this.cdr.detectChanges();
    });

    if (this.authService.isLoggedIn()) {
      this.authService.loadCurrentUser().subscribe({
        error: () => {
          this.authService.logout();
          this.cdr.detectChanges();
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}