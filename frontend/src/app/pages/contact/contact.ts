import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

import { AuthService } from '../../auth/services/auth.service';
import { ContactRequest, ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, NgIf],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements OnInit {
  form: ContactRequest = {
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
    dataConsent: false
  };

  isSending = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private contactService: ContactService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      return;
    }

    this.authService.loadCurrentUser().subscribe({
      next: (user) => {
        this.form.firstName = user.firstName;
        this.form.lastName = user.lastName;
        this.form.email = user.email;
        this.cdr.detectChanges();
      }
    });
  }

  isFormValid(): boolean {
    return !!(
      this.form.firstName.trim() &&
      this.form.lastName.trim() &&
      this.form.email.trim() &&
      this.form.subject.trim() &&
      this.form.message.trim() &&
      this.form.dataConsent
    );
  }

  onSubmit(): void {
    if (!this.isFormValid()) {
      this.errorMessage = 'Veuillez remplir tous les champs et accepter le consentement.';
      return;
    }

    this.isSending = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.contactService.sendContactRequest(this.form).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.isSending = false;

        this.form.subject = '';
        this.form.message = '';
        this.form.dataConsent = false;

        this.cdr.detectChanges();
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Erreur lors de l’envoi du message.';
        this.isSending = false;
        this.cdr.detectChanges();
      }
    });
  }
}