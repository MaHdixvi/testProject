import { Routes } from '@angular/router';
import { HomePageComponent } from './features/Home/page/home-page/home-page.component';
import { AboutUsPageComponent } from './features/about-us/pages/about-us-page/about-us-page.component';
import { Error404Component } from './shared/components/error404/error404.component';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component';
import { SignUpPageComponent } from './features/auth/pages/sign-up-page/sign-up-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'about-us', component: AboutUsPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'sign-up', component: SignUpPageComponent },
  { path: '**', component: Error404Component },
];
