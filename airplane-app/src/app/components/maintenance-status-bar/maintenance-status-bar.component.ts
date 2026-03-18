import { Component, computed, input, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AirplaneStatus } from '../../models/airplane.model';

@Component({
  selector: 'app-maintenance-status-bar',
  imports: [NgClass, MatButtonModule, MatIconModule],
  templateUrl: './maintenance-status-bar.component.html',
})
export class MaintenanceStatusBarComponent {
  readonly maintenanceIntervalFlights = input.required<number>();
  readonly flightsSinceLastMaintenance = input.required<number>();
  readonly status = input<AirplaneStatus>('active');

  readonly addFlight = output<void>();

  protected readonly progress = computed<number>(() =>
    Math.min(
      Math.round((this.flightsSinceLastMaintenance() / this.maintenanceIntervalFlights()) * 100),
      100,
    ),
  );

  protected readonly barClass = computed<string>(() => {
    const pct = this.progress();
    if (pct >= 100) return 'bg-red-500';
    if (pct >= 75) return 'bg-amber-400';
    return 'bg-green-500';
  });

  protected onAddFlight(): void {
    this.addFlight.emit();
  }
}
