import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Application } from '../models/application.model';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'app-applications',
  imports: [NgIf, NgFor, DatePipe, RouterLink],
  templateUrl: './applications.html',
  styleUrl: './applications.scss'
})
export class Applications implements OnInit {
  applications: Application[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private applicationService: ApplicationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.applicationService.getMyApplications().subscribe({
      next: (applications) => {
        this.applications = applications;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Impossible de charger vos candidatures.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}