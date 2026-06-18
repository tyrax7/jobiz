import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';


import { City, Job, JobCategory, JobType } from '../models/job.model';
import { JobFilters, JobService } from '../services/job.service';

@Component({
  selector: 'app-job-list',
  imports: [FormsModule, NgFor, NgIf, RouterLink],
  templateUrl: './job-list.html',
  styleUrl: './job-list.scss'
})
export class JobList implements OnInit {
  jobs: Job[] = [];
  categories: JobCategory[] = [];
  jobTypes: JobType[] = [];
  cities: City[] = [];

  filters: JobFilters = {
    search: '',
    categoryId: '',
    typeId: '',
    cityId: ''
  };

  isLoading = true;
  errorMessage = '';

constructor(
  private jobService: JobService,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {
    this.loadFilters();
    this.loadJobs();
  }

 loadJobs(): void {
  this.isLoading = true;
  this.errorMessage = '';

  this.jobService.getJobs(this.filters).subscribe({
    next: (jobs) => {
      this.jobs = jobs;
      this.isLoading = false;
      this.cdr.detectChanges();
    },
    error: (error) => {
      console.error('Erreur API offres :', error);
      this.errorMessage = 'Impossible de charger les offres.';
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  });
}

  loadFilters(): void {
    this.jobService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

    this.jobService.getJobTypes().subscribe((jobTypes) => {
      this.jobTypes = jobTypes;
    });

    this.jobService.getCities().subscribe((cities) => {
      this.cities = cities;
    });
  }

  resetFilters(): void {
    this.filters = {
      search: '',
      categoryId: '',
      typeId: '',
      cityId: ''
    };

    this.loadJobs();
  }
}