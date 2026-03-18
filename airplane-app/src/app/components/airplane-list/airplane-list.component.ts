import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TailNumberPipe } from '../../pipes/tail-number.pipe';
import { AirplaneService } from '../../services/airplane.service';
import { Airplane } from '../../models/airplane.model';

@Component({
  selector: 'app-airplane-list',
  imports: [TailNumberPipe, RouterLink, NgClass, MatButtonModule, MatIconModule],
  templateUrl: './airplane-list.component.html',
})
export class AirplaneListComponent {
  private readonly airplaneService = inject(AirplaneService);

  protected readonly airplanes: Airplane[] = this.airplaneService.getAirplanes();
}
