import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AirplaneListComponent } from './components/airplane-list/airplane-list.component';
import { AirplaneDetailComponent } from './components/airplane-detail/airplane-detail.component';
import { AirplaneCreateComponent } from './components/airplane-create/airplane-create.component';
import { AirplaneEditComponent } from './components/airplane-edit/airplane-edit.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'airplanes', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'airplanes',
    canActivate: [authGuard],
    children: [
      { path: '', component: AirplaneListComponent },
      { path: 'new', component: AirplaneCreateComponent },
      { path: ':id', component: AirplaneDetailComponent },
      { path: ':id/edit', component: AirplaneEditComponent },
    ],
  },
  { path: '**', redirectTo: 'airplanes' },
];
