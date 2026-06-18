import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cookie-banner',
  imports: [NgIf, RouterLink],
  templateUrl: './cookie-banner.html',
  styleUrl: './cookie-banner.scss'
})
export class CookieBanner implements OnInit {
  isVisible = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const cookieChoice = localStorage.getItem('jobiz_cookie_choice');

    this.isVisible = !cookieChoice;
    this.cdr.detectChanges();
  }

  acceptCookies(): void {
    localStorage.setItem('jobiz_cookie_choice', 'accepted');
    this.isVisible = false;
    this.cdr.detectChanges();
  }

  refuseCookies(): void {
    localStorage.setItem('jobiz_cookie_choice', 'refused');
    this.isVisible = false;
    this.cdr.detectChanges();
  }
}