import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface DialogData {
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogSubject = new BehaviorSubject<DialogData | null>(null);

  dialog$ = this.dialogSubject.asObservable();

  open(title: string, message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.dialogSubject.next({
      title,
      message,
      type
    });
  }

  close(): void {
    this.dialogSubject.next(null);
  }
}