import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/models/auth.model';
import { UpdateProfileRequest, UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {
  user: User | null = null;

  form: UpdateProfileRequest = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  selectedFile: File | null = null;

  isLoading = true;
  isSaving = false;
  isUploading = false;

  successMessage = '';
  errorMessage = '';
  uploadMessage = '';
  uploadError = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.loadCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        this.form = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: ''
        };

        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Impossible de charger votre profil.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  updateProfile(): void {
    this.isSaving = true;
    this.successMessage = '';
    this.errorMessage = '';

    const dataToSend: UpdateProfileRequest = {
      firstName: this.form.firstName,
      lastName: this.form.lastName,
      email: this.form.email
    };

    if (this.form.password) {
      dataToSend.password = this.form.password;
    }

    this.userService.updateProfile(dataToSend).subscribe({
      next: (response) => {
        this.user = response.user;
        this.successMessage = response.message;
        this.form.password = '';
        this.isSaving = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Erreur lors de la mise à jour.';
        this.isSaving = false;
        this.cdr.detectChanges();
      }
    });
  }

  onFileSelected(event: Event): void {
    this.uploadMessage = '';
    this.uploadError = '';

    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.selectedFile = null;
      return;
    }

    const file = input.files[0];

    if (file.type !== 'application/pdf') {
      this.selectedFile = null;
      this.uploadError = 'Le CV doit être au format PDF.';
      this.cdr.detectChanges();
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.selectedFile = null;
      this.uploadError = 'Le CV ne doit pas dépasser 5 Mo.';
      this.cdr.detectChanges();
      return;
    }

    this.selectedFile = file;
  }

  uploadCv(): void {
    if (!this.selectedFile) {
      this.uploadError = 'Veuillez sélectionner un fichier PDF.';
      this.cdr.detectChanges();
      return;
    }

    this.isUploading = true;
    this.uploadMessage = '';
    this.uploadError = '';

    this.userService.uploadCv(this.selectedFile).subscribe({
      next: (response) => {
        this.user = response.user;
        this.uploadMessage = response.message;
        this.selectedFile = null;
        this.isUploading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.uploadError = error.error?.message || 'Erreur lors de l’upload du CV.';
        this.isUploading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getCvFileName(): string {
    return this.user?.cvOriginalName || 'Aucun CV envoyé';
  }

  getCvPreviewUrl(): string | null {
  if (!this.user?.cvPath) {
    return null;
  }

  const apiBaseUrl = environment.apiUrl.replace(/\/api$/, '');
  const publicPath = this.user.cvPath
    .replace(/\\/g, '/')
    .replace(/^.*src\/uploads/, 'uploads')
    .replace(/^\/+/, '');

  return `${apiBaseUrl}/${publicPath}`;
}
}