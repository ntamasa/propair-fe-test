import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AirplaneService } from '../../services/airplane.service';
import { Airplane } from '../../models/airplane.model';
import { TailNumberPipe } from '../../pipes/tail-number.pipe';
import { MaintenanceStatusBarComponent } from '../maintenance-status-bar/maintenance-status-bar.component';

@Component({
  selector: 'app-airplane-detail',
  imports: [
    RouterLink,
    TailNumberPipe,
    MaintenanceStatusBarComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './airplane-detail.component.html',
})
export class AirplaneDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly airplaneService = inject(AirplaneService);

  protected readonly airplane = signal<Airplane | undefined>(undefined);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.airplane.set(this.airplaneService.getById(id));
  }

  protected onAddFlight(): void {
    const current = this.airplane();
    if (!current || current.status === 'maintenance') return;

    const updatedFlights = current.flightsSinceLastMaintenance + 1;
    const reachedLimit = updatedFlights >= current.maintenanceIntervalFlights;

    const updated: Airplane = {
      ...current,
      flightsSinceLastMaintenance: updatedFlights,
      status: reachedLimit ? 'maintenance' : current.status,
    };

    this.airplaneService.updateAirplane(updated);
    this.airplane.set(updated);
  }
}
