import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Airplane } from '../models/airplane.model';
import { API_BASE } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AirplaneService {
  private readonly http = inject(HttpClient);

  async getAll(): Promise<Airplane[]> {
    return firstValueFrom(this.http.get<Airplane[]>(`${API_BASE}/airplanes`));
  }

  async getById(id: string): Promise<Airplane> {
    return firstValueFrom(this.http.get<Airplane>(`${API_BASE}/airplanes/${id}`));
  }

  async create(airplane: Omit<Airplane, 'id'>): Promise<Airplane> {
    return firstValueFrom(this.http.post<Airplane>(`${API_BASE}/airplanes`, airplane));
  }

  async update(id: string, changes: Partial<Omit<Airplane, 'id'>>): Promise<Airplane> {
    return firstValueFrom(this.http.put<Airplane>(`${API_BASE}/airplanes/${id}`, changes));
  }

  async incrementFlights(id: string): Promise<Airplane> {
    return firstValueFrom(
      this.http.post<Airplane>(`${API_BASE}/airplanes/${id}/increment-flights`, {}),
    );
  }

  async delete(id: string): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${API_BASE}/airplanes/${id}`));
  }
}
