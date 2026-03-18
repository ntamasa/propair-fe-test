import { AirplaneStatus } from './airplane.model';

export interface AirplaneFormValue {
  tailNumber: string;
  model: string;
  manufacturer: string;
  capacity: number;
  maintenanceIntervalFlights: number;
  flightsSinceLastMaintenance: number;
  status: AirplaneStatus;
}
