# Angular Junior Test — Airplane Management

---

## Setup

- **Frontend:** Create a new Angular project (e.g. `ng new airplane-app`).
- **Backend:** From the project root run:
  ```bash
  cd backend && npm install && npm start
  or use docker compose up -d
  ```
  API runs at `http://localhost:3000`. Use this base URL for all HTTP tasks. See **`backend/README.md`** for API details, login credentials (`pilot@airline.com` / `pilot123`), and request/response shapes.

---

## Tasks 1–7 (components, services, routing, forms)

### Task 1 — Airplane service and list
Create an **Angular service** (e.g. `AirplaneService`) that holds an in-memory array of airplanes. Use this list (or one like it) with fields: `id`, `tailNumber`, `model`, `manufacturer`, `capacity`, `status`, `maintenanceIntervalFlights`, `flightsSinceLastMaintenance`:

```
[
  { id: '1', tailNumber: 'N12345', model: '737-800', manufacturer: 'Boeing', capacity: 189, status: 'active', maintenanceIntervalFlights: 100, flightsSinceLastMaintenance: 45 },
  { id: '2', tailNumber: 'N67890', model: 'A320', manufacturer: 'Airbus', capacity: 180, status: 'active', maintenanceIntervalFlights: 100, flightsSinceLastMaintenance: 92 },
  { id: '3', tailNumber: 'N11111', model: '787-9', manufacturer: 'Boeing', capacity: 296, status: 'maintenance', maintenanceIntervalFlights: 100, flightsSinceLastMaintenance: 100 },
]
```
(Planes need maintenance every `maintenanceIntervalFlights`; `flightsSinceLastMaintenance` is the count since last service.)

Expose the list from the service (e.g. a method `getAirplanes()` or a getter). Create a component that **injects** this service and displays the airplanes in a simple list or table. In the list, show **only** `tailNumber`, `model`, and `manufacturer` for each airplane. Use Angular’s **modern control flow**: `@for` to iterate and `@if` to show a message when the list is empty.

### Task 2 — Tail number pipe
Create a **pipe** named `tailNumber` that formats a tail number (e.g. `"N12345"` → `"N-12345"`). Use it in the airplane list from Task 1 so tail numbers are displayed with the hyphen.

### Task 3 — Routing and airplane detail
Add a method to `AirplaneService` that returns a single airplane by `id` (e.g. `getById(id)`). Add **routing** with two routes:
- `/airplanes` — list of airplanes (from the service).
- `/airplanes/:id` — detail view for one airplane by `id`.

Create a detail component that reads the route param and uses the service’s `getById(id)` to show that airplane’s data. From the list, make each airplane a link that **navigates** to its detail page (e.g. `/airplanes/1`). No HTTP.

### Task 4 — Styling with ngClass and maintenance progress bar
In the airplane list:
- Use **`ngClass`** to style rows by status: when an airplane has `status === 'maintenance'`, give that row a different **background color** and **text color** (e.g. muted or warning style) so it stands out from active airplanes.
- Add a **progress bar** on the detail page that shows how close the plane is to its next maintenance: use `flightsSinceLastMaintenance` and `maintenanceIntervalFlights` (e.g. planes need maintenance every 100 flights). The bar should be a visual bar whose width is the `flightsSinceLastMaintenance`. Change the bar color when the plane is near or at the interval (e.g. yellow near 75%, red at 100%).

### Task 5 — Maintenance status bar component
Put the maintenance **progress bar** from Task 4 into a **separate component**. The component should:
- Receive the maintenance details (`maintenanceIntervalFlights`, `flightsSinceLastMaintenance`, and optionally `status`) as **`input`**.
- Display the progress bar (same behavior as in Task 4).
- Provide a **button** (e.g. "Add flight") that, when clicked, emits an event via **`output`** so the parent can increment `flightsSinceLastMaintenance` (e.g. the parent updates the airplane in the service).
- When the counter reaches the max (`flightsSinceLastMaintenance >= maintenanceIntervalFlights`), the parent should set the airplane's **`status`** to `'maintenance'` (logic can live in the parent or service). No HTTP.

### Task 6 — Add airplane form
Create a **new page** (e.g. route `/airplanes/new`) with a reactive **form** to create a new airplane. Fields: `tailNumber`, `model`, `manufacturer`, `capacity`, and the **maintenance details** — `maintenanceIntervalFlights` and `flightsSinceLastMaintenance`. On submit, add the new airplane to the in-memory service and navigate to the list or the new airplane’s detail page. No API. Add a link or button from the airplane list (or layout) to reach this page.

### Task 7 — Form error handling
Add **validation and error handling** to the add-airplane form from Task 6. Use reactive or template-driven validation so that:
- Required fields (`tailNumber`, `model`, `manufacturer`, `capacity`, `maintenanceIntervalFlights`, `flightsSinceLastMaintenance`) show an error when empty or invalid (e.g. capacity and maintenance numbers must be non-negative or positive integers).
- Error messages are shown next to each field or in a summary when the user has touched the field or submitted the form.
- The submit button is disabled (or the form does not submit) when the form is invalid.

---

## Tasks 8–16 (HTTP — backend required)

Use the Express backend in `backend/`. All API routes (except login) require a valid **JWT** in the `Authorization: Bearer <token>` header. See backend README for login credentials and response shapes.

### Task 8 — Login page and logic
Create the **login page** and the logic for it:
- A login form (e.g. email + password) that sends `POST /api/auth/login` with body `{ "email", "password" }`.
- Store the returned **JWT** (e.g. in `localStorage` or a service).
- Create an **HTTP interceptor** that adds the header `Authorization: Bearer <token>` to all requests to the API when a token is present.

**Login details** (use these with the backend): `pilot@airline.com` / `pilot123`.

### Task 9 — Auth guard
Create an **auth guard** that checks if the user has a valid token (e.g. stored after login). Protect the airplane list and detail routes so that unauthenticated users are **redirected to the login page**. Allow access to the login page without the guard.

### Task 10 — HTTP service for airplanes and load list
Create an **Angular service** that uses **`HttpClient`** to call `GET /api/airplanes` (use the backend base URL, e.g. `http://localhost:3000`). The method should return an Observable of the airplane list. Use the JWT and interceptor from Task 8 so that requests include the token. Replace the in-memory airplane list with data from this API: show a **loading** state while the request is in progress and an **error** message if the request fails. Use the same list UI as before.

### Task 11 — Airplane detail from API
On the airplane detail route (`/airplanes/:id`), load the airplane with **`GET /api/airplanes/:id`** instead of the in-memory service. Show loading and error states. Use the same detail component if possible.

### Task 12 — Increment flights button
Use the "Add flight" button on the airplane detail page so it calls the **`POST /api/airplanes/:id/increment-flights`** endpoint. This endpoint increments `flightsSinceLastMaintenance` by 1 and returns the updated airplane; when the value reaches `maintenanceIntervalFlights`, the backend sets `status` to `'maintenance'`. After a successful call, refresh the displayed airplane (or the list) so the user sees the updated count and status.

### Task 13 — Create airplane via API
Replace the “add airplane” flow from Task 6 with **`POST /api/airplanes`**. Send the new airplane in the request body. Ensure the request includes the JWT (interceptor from Task 8). After success, navigate to the list or the new airplane’s detail.

### Task 14 — Edit airplane via API
Add **edit** functionality: a form pre-filled with an airplane’s data that sends **`PUT /api/airplanes/:id`** to update it. Reuse or extend the form from Task 6/13. Show success and error feedback.

### Task 15 — Delete airplane with confirmation
Implement **delete**:
- Call **`DELETE /api/airplanes/:id`** (with auth).
- Before sending the request, show a **confirmation dialog** (e.g. “Are you sure you want to delete this airplane?”). Only call the API if the user confirms. After success, navigate back to the list.

### Task 16 — Logout and cleanup
Implement **logout** and cleanup:
- Add a logout button or link (e.g. in the header or layout) that clears the stored JWT and redirects the user to the login page.
- Ensure that after logout, protected routes are no longer accessible (the auth guard should redirect to login when there is no token).
---

Good luck.
