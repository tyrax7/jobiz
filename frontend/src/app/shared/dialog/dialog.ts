import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';

import { DialogService } from './dialog.service';

@Component({
  selector: 'app-dialog',
  imports: [NgIf, AsyncPipe],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss'
})
export class Dialog {
  constructor(public dialogService: DialogService) {}

  close(): void {
    this.dialogService.close();
  }
}