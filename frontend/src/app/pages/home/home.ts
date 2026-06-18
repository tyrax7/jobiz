import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

import { Job } from '../../jobs/models/job.model';
import { JobService } from '../../jobs/services/job.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  jobs: Job[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private jobService: JobService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.jobService.getJobs().subscribe({
      next: (jobs) => {
        this.jobs = jobs.slice(0, 3);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les dernières offres.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}