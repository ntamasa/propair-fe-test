# Airplane API (Backend)

Express server with mock data and JWT auth for the Angular junior test (Tasks 8–16).

## Install and run

```bash
npm install
npm start
```

Server runs at **http://localhost:3000**.

### Optional: Docker

From the project root you can run the backend in Docker:

```bash
docker compose up --build
```

The API is available at **http://localhost:3000**. See the root `docker-compose.yml` and `backend/Dockerfile`.

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | No | Health check |
| POST | `/api/auth/login` | No | Login, returns JWT |
| GET | `/api/airplanes` | Yes | List all airplanes |
| GET | `/api/airplanes/:id` | Yes | Get one airplane |
| POST | `/api/airplanes` | Yes | Create airplane |
| POST | `/api/airplanes/:id/increment-flights` | Yes | Increment `flightsSinceLastMaintenance` by 1; sets `status` to `'maintenance'` when it reaches `maintenanceIntervalFlights`. Returns updated airplane. |
| PUT | `/api/airplanes/:id` | Yes | Update airplane |
| DELETE | `/api/airplanes/:id` | Yes | Delete airplane |

## Authentication

- **Login:** `POST /api/auth/login` with body:
  ```json
  { "email": "pilot@airline.com", "password": "pilot123" }
  ```
  or `admin@airline.com` / `admin123`.

- Response includes a `token`. Send it on protected requests:
  ```
  Authorization: Bearer <token>
  ```

## Airplane shape

```json
{
  "id": "1",
  "tailNumber": "N12345",
  "model": "737-800",
  "manufacturer": "Boeing",
  "capacity": 189,
  "status": "active",
  "maintenanceIntervalFlights": 100,
  "flightsSinceLastMaintenance": 45
}
```

- **POST /api/airplanes:** send `tailNumber`, `model`, `manufacturer`, `capacity` (optional: `status`, `maintenanceIntervalFlights`). `flightsSinceLastMaintenance` is always set to 0; use the increment-flights endpoint to change it.
- **PUT /api/airplanes/:id:** send any of the fields to update except `flightsSinceLastMaintenance` (only changed via `POST /api/airplanes/:id/increment-flights`).

All data is in-memory and resets when the server restarts.
