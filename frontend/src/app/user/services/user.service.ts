import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { User } from '../../auth/models/auth.model';

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  updateProfile(data: UpdateProfileRequest) {
    return this.http.put<{ message: string; user: User }>(`${this.apiUrl}/users/me`, data);
  }

  uploadCv(file: File) {
    const formData = new FormData();
    formData.append('cv', file);

    return this.http.post<{ message: string; user: User }>(`${this.apiUrl}/users/me/cv`, formData);
  }
}