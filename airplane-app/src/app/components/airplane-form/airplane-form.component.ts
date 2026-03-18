import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AirplaneService } from '../../services/airplane.service';
import { AirplaneStatus } from '../../models/airplane.model';
import { integerValidator } from '../../validators/integer.validator';

@Component({
  selector: 'app-airplane-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './airplane-form.component.html',
})
export class AirplaneFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly airplaneService = inject(AirplaneService);
  private readonly router = inject(Router);

  protected readonly form = this.fb.group({
    tailNumber: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    model: ['', [Validators.required, Validators.maxLength(50)]],
    manufacturer: ['', [Validators.required, Validators.maxLength(50)]],
    capacity: [0, [Validators.required, Validators.min(1), Validators.max(999), integerValidator]],
    maintenanceIntervalFlights: [100, [Validators.required, Validators.min(1), integerValidator]],
    flightsSinceLastMaintenance: [0, [Validators.required, Validators.min(0), integerValidator]],
  });

  protected readonly loading = signal<boolean>(false);
  protected readonly error = signal<string | null>(null);

  protected async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const {
      tailNumber,
      model,
      manufacturer,
      capacity,
      maintenanceIntervalFlights,
      flightsSinceLastMaintenance,
    } = this.form.getRawValue();

    const status: AirplaneStatus =
      flightsSinceLastMaintenance >= maintenanceIntervalFlights ? 'maintenance' : 'active';

    this.loading.set(true);
    this.error.set(null);

    try {
      const created = await this.airplaneService.create({
        tailNumber,
        model,
        manufacturer,
        capacity,
        maintenanceIntervalFlights,
        flightsSinceLastMaintenance,
        status,
      });
      this.router.navigate(['/airplanes', created.id]);
    } catch {
      this.error.set('Failed to create airplane. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }
}
