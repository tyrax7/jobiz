import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { City, Job, JobCategory, JobType } from '../models/job.model';

export interface JobFilters {
  search?: string;
  categoryId?: string;
  typeId?: string;
  cityId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getJobs(filters: JobFilters = {}) {
    let params = new HttpParams();

    if (filters.search) params = params.set('search', filters.search);
    if (filters.categoryId) params = params.set('categoryId', filters.categoryId);
    if (filters.typeId) params = params.set('typeId', filters.typeId);
    if (filters.cityId) params = params.set('cityId', filters.cityId);

    return this.http.get<Job[]>(`${this.apiUrl}/jobs`, { params });
  }

  getJobById(id: number) {
    return this.http.get<Job>(`${this.apiUrl}/jobs/${id}`);
  }

  getCategories() {
    return this.http.get<JobCategory[]>(`${this.apiUrl}/categories`);
  }

  getJobTypes() {
    return this.http.get<JobType[]>(`${this.apiUrl}/job-types`);
  }

  getCities() {
    return this.http.get<City[]>(`${this.apiUrl}/cities`);
  }
}