import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AirplaneService } from '../../services/airplane.service';
import { Airplane } from '../../models/airplane.model';
import { TailNumberPipe } from '../../pipes/tail-number.pipe';

@Component({
  selector: 'app-airplane-detail',
  imports: [RouterLink, TailNumberPipe],
  templateUrl: './airplane-detail.component.html',
})
export class AirplaneDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly airplaneService = inject(AirplaneService);

  protected readonly airplane = signal<Airplane | undefined>(undefined);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.airplane.set(this.airplaneService.getById(id));
  }
}
