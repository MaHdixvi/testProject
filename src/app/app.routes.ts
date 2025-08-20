import { Routes } from '@angular/router';
import { HomePageComponent } from './features/Home/page/home-page/home-page.component';
import { AboutUsPageComponent } from './features/about-us/pages/about-us-page/about-us-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'about-us', component: AboutUsPageComponent },
];
