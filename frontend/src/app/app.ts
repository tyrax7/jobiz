import { Component } from '@angular/core';
import { Layout } from './core/layout/layout';
import { Dialog } from './shared/dialog/dialog';

@Component({
  selector: 'app-root',
  imports: [Layout, Dialog],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}