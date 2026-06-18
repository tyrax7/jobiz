import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { NotFound } from './pages/not-found/not-found';

import { JobList } from './jobs/job-list/job-list';
import { JobDetail } from './jobs/job-detail/job-detail';

import { Login } from './auth/login/login';
import { Register } from './auth/register/register';

import { Account } from './user/account/account';
import { Profile } from './user/profile/profile';
import { Applications } from './user/applications/applications';

import { LegalNotice } from './legal/legal-notice/legal-notice';
import { Privacy } from './legal/privacy/privacy';
import { Cookies } from './legal/cookies/cookies';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'jobs', component: JobList },
  { path: 'jobs/:id', component: JobDetail },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'account', component: Account },
  { path: 'account/profile', component: Profile },
  { path: 'account/applications', component: Applications },
  { path: 'legal/mentions-legales', component: LegalNotice },
  { path: 'legal/privacy', component: Privacy },
  { path: 'legal/cookies', component: Cookies },
  { path: '**', component: NotFound }
];