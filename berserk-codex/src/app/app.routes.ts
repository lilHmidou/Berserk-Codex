// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { ArcFriezeComponent } from './components/arc-frieze/arc-frieze.component';
import {EncyclopediaComponent} from './components/encyclopedie/encyclopedie.component';
import {ArmesArtifactsComponent} from './components/armes-artifacts/armes-artifacts.component';
import {DestineeComponent} from './components/destinee/destinee.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'map', component: MapComponent},
  { path: 'encyclopedie', component: EncyclopediaComponent},
  { path: 'armes-artifacts', component: ArmesArtifactsComponent},
  { path:'arc-frieze', component:ArcFriezeComponent},
  { path:'destinee', component:DestineeComponent},
  { path: '**', component: HomeComponent }
];
