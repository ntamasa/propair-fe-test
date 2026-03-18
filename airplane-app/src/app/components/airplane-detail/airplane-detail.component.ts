import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { AirplaneService } from '../../services/airplane.service';
import { Airplane } from '../../models/airplane.model';
import { TailNumberPipe } from '../../pipes/tail-number.pipe';
import { MaintenanceStatusBarComponent } from '../maintenance-status-bar/maintenance-status-bar.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../confirm-dialog/confirm-dialog.component';
import { firstValueFrom } from 'rxjs';

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
  private readonly router = inject(Router);
  private readonly airplaneService = inject(AirplaneService);
  private readonly dialog = inject(MatDialog);

  airplane = signal<Airplane | undefined>(undefined);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  deleting = signal<boolean>(false);

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

  async onAddFlight(): Promise<void> {
    const current = this.airplane();
    if (!current || current.status === 'maintenance') return;

    const updated = await this.airplaneService.incrementFlights(current.id);
    this.airplane.set(updated);
  }

  async onDelete(): Promise<void> {
    const current = this.airplane();
    if (!current) return;

    const confirmed = await firstValueFrom(
      this.dialog
        .open<ConfirmDialogComponent, ConfirmDialogData, boolean>(ConfirmDialogComponent, {
          data: {
            title: 'Delete airplane',
            message: `Are you sure you want to delete ${current.tailNumber}? This action cannot be undone.`,
            confirmLabel: 'Delete',
            cancelLabel: 'Cancel',
          },
          width: '400px',
        })
        .afterClosed(),
    );

    if (!confirmed) return;

    this.deleting.set(true);

    try {
      await this.airplaneService.delete(current.id);
      this.router.navigate(['/airplanes']);
    } catch {
      this.error.set('Failed to delete airplane. Please try again.');
    } finally {
      this.deleting.set(false);
    }
  }
}
