import { Component, inject } from '@angular/core';
import { TailNumberPipe } from '../../pipes/tail-number.pipe';
import { AirplaneService } from '../../services/airplane.service';
import { Airplane } from '../../models/airplane.model';

@Component({
  selector: 'app-airplane-list',
  imports: [TailNumberPipe],
  templateUrl: './airplane-list.component.html',
})
export class AirplaneListComponent {
  private readonly airplaneService = inject(AirplaneService);

  protected readonly airplanes: Airplane[] = this.airplaneService.getAirplanes();
}
