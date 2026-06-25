import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

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
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadFiltersThenJobs();
  }

  loadFiltersThenJobs(): void {
    forkJoin({
      categories: this.jobService.getCategories(),
      jobTypes: this.jobService.getJobTypes(),
      cities: this.jobService.getCities()
    }).subscribe({
      next: (data) => {
        this.categories = data.categories;
        this.jobTypes = data.jobTypes;
        this.cities = data.cities;

        this.route.queryParams.subscribe((params) => {
  const categoryName = params['category'];
  const categoryId = params['categoryId'];

  const selectedCategory = categoryName
    ? this.categories.find((category) => category.name === categoryName)
    : null;

  this.filters = {
    search: params['search'] || '',
    categoryId: selectedCategory
      ? String(selectedCategory.id)
      : categoryId
        ? String(categoryId)
        : '',
    typeId: params['typeId'] || '',
    cityId: params['cityId'] || ''
  };

  this.loadJobs();
});

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erreur chargement filtres :', error);
        this.errorMessage = 'Impossible de charger les filtres.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
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