import { Component, inject, input, output, OnInit, booleanAttribute } from '@angular/core';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AirplaneFormValue } from '../../models/airplane-form-value.model';
import { AirplaneStatus } from '../../models/airplane.model';
import { integerValidator } from '../../validators/integer.validator';

@Component({
  selector: 'app-airplane-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './airplane-form.component.html',
})
export class AirplaneFormComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly initialValue = input<Partial<AirplaneFormValue>>();
  readonly submitLabel = input<string>('Save');
  readonly loading = input<boolean>(false);
  readonly error = input<string | null>(null);
  readonly showStatus = input(false, { transform: booleanAttribute });

  readonly formSubmit = output<AirplaneFormValue>();
  readonly cancelled = output<void>();

  protected readonly statusOptions: AirplaneStatus[] = ['active', 'maintenance'];

  protected readonly form = this.fb.group({
    tailNumber: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    model: ['', [Validators.required, Validators.maxLength(50)]],
    manufacturer: ['', [Validators.required, Validators.maxLength(50)]],
    capacity: [0, [Validators.required, Validators.min(1), Validators.max(999), integerValidator]],
    maintenanceIntervalFlights: [100, [Validators.required, Validators.min(1), integerValidator]],
    flightsSinceLastMaintenance: [0, [Validators.required, Validators.min(0), integerValidator]],
    status: ['active' as AirplaneStatus],
  });

  ngOnInit(): void {
    const initial = this.initialValue();
    if (initial) this.form.patchValue(initial);
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.formSubmit.emit(this.form.getRawValue() as AirplaneFormValue);
  }

  protected onCancel(): void {
    this.cancelled.emit();
  }
}
