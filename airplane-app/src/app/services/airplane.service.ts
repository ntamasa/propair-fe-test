import { Injectable, signal } from '@angular/core';
import { Airplane } from '../models/airplane.model';

@Injectable({ providedIn: 'root' })
export class AirplaneService {
  private readonly _airplanes = signal<Airplane[]>([
    {
      id: '1',
      tailNumber: 'N12345',
      model: '737-800',
      manufacturer: 'Boeing',
      capacity: 189,
      status: 'active',
      maintenanceIntervalFlights: 100,
      flightsSinceLastMaintenance: 45,
    },
    {
      id: '2',
      tailNumber: 'N67890',
      model: 'A320',
      manufacturer: 'Airbus',
      capacity: 180,
      status: 'active',
      maintenanceIntervalFlights: 100,
      flightsSinceLastMaintenance: 92,
    },
    {
      id: '3',
      tailNumber: 'N11111',
      model: '787-9',
      manufacturer: 'Boeing',
      capacity: 296,
      status: 'maintenance',
      maintenanceIntervalFlights: 100,
      flightsSinceLastMaintenance: 100,
    },
  ]);

  getAirplanes(): Airplane[] {
    return this._airplanes();
  }

  getById(id: string): Airplane | undefined {
    return this._airplanes().find((a) => a.id === id);
  }
}
