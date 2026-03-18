import { Routes } from '@angular/router';
import { AirplaneListComponent } from './components/airplane-list/airplane-list.component';

export const routes: Routes = [
  { path: '', component: AirplaneListComponent },
  { path: '**', redirectTo: '' },
];
