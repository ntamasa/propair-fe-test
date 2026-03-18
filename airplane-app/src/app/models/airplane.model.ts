export type AirplaneStatus = 'active' | 'maintenance';

export interface Airplane {
  id: string;
  tailNumber: string;
  model: string;
  manufacturer: string;
  capacity: number;
  status: AirplaneStatus;
  maintenanceIntervalFlights: number;
  flightsSinceLastMaintenance: number;
}
