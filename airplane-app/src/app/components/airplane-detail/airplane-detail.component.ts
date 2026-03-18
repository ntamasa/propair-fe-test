import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { AirplaneService } from '../../services/airplane.service';
import { Airplane } from '../../models/airplane.model';
import { TailNumberPipe } from '../../pipes/tail-number.pipe';

@Component({
  selector: 'app-airplane-detail',
  imports: [RouterLink, TailNumberPipe, NgClass],
  templateUrl: './airplane-detail.component.html',
})
export class AirplaneDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly airplaneService = inject(AirplaneService);

  protected readonly airplane = signal<Airplane | undefined>(undefined);

  protected readonly maintenanceProgress = computed<number>(() => {
    const airplane = this.airplane();
    if (!airplane) return 0;
    return Math.round(
      (airplane.flightsSinceLastMaintenance / airplane.maintenanceIntervalFlights) * 100,
    );
  });

  protected readonly progressBarClass = computed<string>(() => {
    const progress = this.maintenanceProgress();
    if (progress === 100) return 'bg-red-500';
    if (progress >= 75) return 'bg-amber-400';
    return 'bg-green-500';
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.airplane.set(this.airplaneService.getById(id));
  }
}
