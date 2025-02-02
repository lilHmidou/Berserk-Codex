// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'map', component: MapComponent}
];