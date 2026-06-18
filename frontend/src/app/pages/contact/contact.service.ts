import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

export interface ContactRequest {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  dataConsent: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  sendContactRequest(data: ContactRequest) {
    return this.http.post<{ message: string }>(`${this.apiUrl}/contact`, data);
  }
}