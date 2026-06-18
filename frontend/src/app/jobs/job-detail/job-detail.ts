import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

import { Job } from '../models/job.model';
import { JobService } from '../services/job.service';
import { AuthService } from '../../auth/services/auth.service';
import { ApplicationService } from '../../user/services/application.service';

@Component({
  selector: 'app-job-detail',
  imports: [NgFor, NgIf, RouterLink, FormsModule],
  templateUrl: './job-detail.html',
  styleUrl: './job-detail.scss'
})
export class JobDetail implements OnInit {
  job?: Job;
  jobId = 0;

  coverLetter = '';

  isLoggedIn = false;
  isLoading = true;
  isApplying = false;

  errorMessage = '';
  applicationSuccess = '';
  applicationError = '';

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private authService: AuthService,
    private applicationService: ApplicationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    this.jobId = Number(this.route.snapshot.paramMap.get('id'));

    if (Number.isNaN(this.jobId)) {
      this.errorMessage = 'Offre invalide.';
      this.isLoading = false;
      this.cdr.detectChanges();
      return;
    }

    this.jobService.getJobById(this.jobId).subscribe({
      next: (job) => {
        this.job = job;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Impossible de charger cette offre.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  apply(): void {
    if (!this.coverLetter.trim()) {
      this.applicationError = 'La lettre de motivation est obligatoire.';
      return;
    }

    this.isApplying = true;
    this.applicationSuccess = '';
    this.applicationError = '';

    this.applicationService.createApplication({
      jobId: this.jobId,
      coverLetter: this.coverLetter
    }).subscribe({
      next: (response) => {
        this.applicationSuccess = response.message;
        this.coverLetter = '';
        this.isApplying = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.applicationError = error.error?.message || 'Erreur lors de la candidature.';
        this.isApplying = false;
        this.cdr.detectChanges();
      }
    });
  }
}