import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
    MatProgressSpinnerModule,
  ],
  templateUrl: './airplane-detail.component.html',
})
export class AirplaneDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly airplaneService = inject(AirplaneService);

  protected readonly airplane = signal<Airplane | undefined>(undefined);
  protected readonly loading = signal<boolean>(true);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.loadAirplane(id);
  }

  private async loadAirplane(id: string): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const data = await this.airplaneService.getById(id);
      this.airplane.set(data);
    } catch {
      this.error.set('Airplane not found or failed to load.');
    } finally {
      this.loading.set(false);
    }
  }

  protected async onAddFlight(): Promise<void> {
    const current = this.airplane();
    if (!current || current.status === 'maintenance') return;

    const updated = await this.airplaneService.incrementFlights(current.id);
    this.airplane.set(updated);
  }
}
