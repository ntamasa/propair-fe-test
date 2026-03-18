import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AirplaneService } from '../../services/airplane.service';
import { Airplane } from '../../models/airplane.model';

@Component({
  selector: 'app-airplane-list',
  imports: [CommonModule],
  templateUrl: './airplane-list.component.html',
})
export class AirplaneListComponent {
  private readonly airplaneService = inject(AirplaneService);

  protected readonly airplanes: Airplane[] = this.airplaneService.getAirplanes();
}
