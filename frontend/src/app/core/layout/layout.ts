import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { CookieBanner } from '../../shared/cookie-banner/cookie-banner';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, CookieBanner],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {}