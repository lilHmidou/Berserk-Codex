// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import {EncyclopediaComponent} from './components/encyclopedie/encyclopedie.component';
import {ArmesArtifactsComponent} from './components/armes-artifacts/armes-artifacts.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'encyclopedie', component: EncyclopediaComponent},
  { path: 'armes-artifacts', component: ArmesArtifactsComponent },
  {path: 'map', component: MapComponent}
];
