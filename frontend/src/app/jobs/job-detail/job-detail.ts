import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

import { Job } from '../models/job.model';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-job-detail',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './job-detail.html',
  styleUrl: './job-detail.scss'
})
export class JobDetail implements OnInit {
  job?: Job;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const jobId = Number(this.route.snapshot.paramMap.get('id'));

    if (Number.isNaN(jobId)) {
      this.errorMessage = 'Offre invalide.';
      this.isLoading = false;
      this.cdr.detectChanges();
      return;
    }

    this.jobService.getJobById(jobId).subscribe({
      next: (job) => {
        this.job = job;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erreur API détail offre :', error);
        this.errorMessage = 'Impossible de charger cette offre.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}