import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Application, CreateApplicationRequest } from '../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createApplication(data: CreateApplicationRequest) {
    return this.http.post<{ message: string; application: Application }>(
      `${this.apiUrl}/applications`,
      data
    );
  }

  getMyApplications() {
    return this.http.get<Application[]>(`${this.apiUrl}/applications/me`);
  }
}