import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AirplaneService } from '../../services/airplane.service';
import { AirplaneFormValue } from '../../models/airplane-form-value.model';
import { AirplaneFormComponent } from '../airplane-form/airplane-form.component';

@Component({
  selector: 'app-airplane-edit',
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    AirplaneFormComponent,
  ],
  templateUrl: './airplane-edit.component.html',
})
export class AirplaneEditComponent implements OnInit {
  private readonly airplaneService = inject(AirplaneService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  id = this.route.snapshot.paramMap.get('id') ?? '';
  initialValue = signal<Partial<AirplaneFormValue> | undefined>(undefined);
  loadError = signal<string | null>(null);
  loading = signal<boolean>(true);
  saving = signal<boolean>(false);
  saveError = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    try {
      const airplane = await this.airplaneService.getById(this.id);
      this.initialValue.set({
        tailNumber: airplane.tailNumber,
        model: airplane.model,
        manufacturer: airplane.manufacturer,
        capacity: airplane.capacity,
        maintenanceIntervalFlights: airplane.maintenanceIntervalFlights,
        status: airplane.status,
      });
    } catch {
      this.loadError.set('Failed to load airplane data.');
    } finally {
      this.loading.set(false);
    }
  }

  async onFormSubmit(value: AirplaneFormValue): Promise<void> {
    this.saving.set(true);
    this.saveError.set(null);

    try {
      await this.airplaneService.update(this.id, value);
      this.router.navigate(['/airplanes', this.id]);
    } catch {
      this.saveError.set('Failed to save changes. Please try again.');
    } finally {
      this.saving.set(false);
    }
  }

  onCancel(): void {
    this.router.navigate(['/airplanes', this.id]);
  }
}
