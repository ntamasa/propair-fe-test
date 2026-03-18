import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AirplaneService } from '../../services/airplane.service';
import { AirplaneStatus } from '../../models/airplane.model';
import { AirplaneFormValue } from '../../models/airplane-form-value.model';
import { AirplaneFormComponent } from '../airplane-form/airplane-form.component';

@Component({
  selector: 'app-airplane-create',
  imports: [RouterLink, MatButtonModule, MatIconModule, AirplaneFormComponent],
  templateUrl: './airplane-create.component.html',
})
export class AirplaneCreateComponent {
  private readonly airplaneService = inject(AirplaneService);
  private readonly router = inject(Router);

  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  async onFormSubmit(value: AirplaneFormValue): Promise<void> {
    const status: AirplaneStatus =
      value.flightsSinceLastMaintenance >= value.maintenanceIntervalFlights
        ? 'maintenance'
        : 'active';

    this.loading.set(true);
    this.error.set(null);

    try {
      const created = await this.airplaneService.create({ ...value, status });
      this.router.navigate(['/airplanes', created.id]);
    } catch {
      this.error.set('Failed to create airplane. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }

  onCancel(): void {
    this.router.navigate(['/airplanes']);
  }
}
