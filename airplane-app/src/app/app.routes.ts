import { Routes } from '@angular/router';
import { AirplaneListComponent } from './components/airplane-list/airplane-list.component';
import { AirplaneDetailComponent } from './components/airplane-detail/airplane-detail.component';
import { AirplaneFormComponent } from './components/airplane-form/airplane-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'airplanes', pathMatch: 'full' },
  { path: 'airplanes', component: AirplaneListComponent },
  { path: 'airplanes/new', component: AirplaneFormComponent },
  { path: 'airplanes/:id', component: AirplaneDetailComponent },
  { path: '**', redirectTo: 'airplanes' },
];
