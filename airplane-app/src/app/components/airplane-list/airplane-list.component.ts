import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TailNumberPipe } from '../../pipes/tail-number.pipe';
import { AirplaneService } from '../../services/airplane.service';
import { Airplane } from '../../models/airplane.model';

@Component({
  selector: 'app-airplane-list',
  imports: [
    TailNumberPipe,
    RouterLink,
    NgClass,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './airplane-list.component.html',
})
export class AirplaneListComponent implements OnInit {
  private readonly airplaneService = inject(AirplaneService);

  airplanes = signal<Airplane[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadAirplanes();
  }

  async loadAirplanes(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const data = await this.airplaneService.getAll();
      this.airplanes.set(data);
    } catch {
      this.error.set('Failed to load airplanes. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }
}
