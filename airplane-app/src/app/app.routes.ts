import { Routes } from '@angular/router';
import { AirplaneListComponent } from './components/airplane-list/airplane-list.component';
import { AirplaneDetailComponent } from './components/airplane-detail/airplane-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'airplanes', pathMatch: 'full' },
  { path: 'airplanes', component: AirplaneListComponent },
  { path: 'airplanes/:id', component: AirplaneDetailComponent },
  { path: '**', redirectTo: 'airplanes' },
];
