/**
 * Mock airplane data for the API.
 * In-memory store; mutations are applied to this array.
 */

const airplanes = [
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
  {
    id: '4',
    tailNumber: 'N22222',
    model: 'A350-900',
    manufacturer: 'Airbus',
    capacity: 325,
    status: 'active',
    maintenanceIntervalFlights: 100,
    flightsSinceLastMaintenance: 22,
  },
  {
    id: '5',
    tailNumber: 'N33333',
    model: 'E190',
    manufacturer: 'Embraer',
    capacity: 100,
    status: 'active',
    maintenanceIntervalFlights: 100,
    flightsSinceLastMaintenance: 78,
  },
];

// Simple in-memory store that can be mutated (for POST/PUT/DELETE)
let store = JSON.parse(JSON.stringify(airplanes));

function getAll() {
  return JSON.parse(JSON.stringify(store));
}

function getById(id) {
  return store.find((a) => a.id === String(id))
    ? JSON.parse(JSON.stringify(store.find((a) => a.id === String(id))))
    : null;
}

function getNextId() {
  const ids = store.map((a) => parseInt(a.id, 10)).filter((n) => !Number.isNaN(n));
  const max = ids.length ? Math.max(...ids) : 0;
  return String(max + 1);
}

function create(airplane) {
  const newId = getNextId();
  const newAirplane = {
    id: newId,
    tailNumber: airplane.tailNumber || '',
    model: airplane.model || '',
    manufacturer: airplane.manufacturer || '',
    capacity: Number(airplane.capacity) || 0,
    status: airplane.status || 'active',
    maintenanceIntervalFlights: Number(airplane.maintenanceIntervalFlights) || 100,
    flightsSinceLastMaintenance: Number(airplane.flightsSinceLastMaintenance) || 0,
  };
  store.push(newAirplane);
  return JSON.parse(JSON.stringify(newAirplane));
}

function update(id, updates) {
  const index = store.findIndex((a) => a.id === String(id));
  if (index === -1) return null;
  const current = store[index];
  const updated = {
    ...current,
    ...updates,
    id: current.id,
  };
  store[index] = updated;
  return JSON.parse(JSON.stringify(updated));
}

function remove(id) {
  const index = store.findIndex((a) => a.id === String(id));
  if (index === -1) return false;
  store.splice(index, 1);
  return true;
}

/**
 * Increment flightsSinceLastMaintenance by 1. If it reaches maintenanceIntervalFlights, set status to 'maintenance'.
 * Returns the updated airplane or null if not found.
 */
function incrementFlights(id) {
  const airplane = getById(id);
  if (!airplane) return null;
  const index = store.findIndex((a) => a.id === String(id));
  const current = store[index];
  const nextFlights = (current.flightsSinceLastMaintenance || 0) + 1;
  const interval = current.maintenanceIntervalFlights || 100;
  const newStatus = nextFlights >= interval ? 'maintenance' : (current.status || 'active');
  const updated = {
    ...current,
    flightsSinceLastMaintenance: nextFlights,
    status: newStatus,
  };
  store[index] = updated;
  return JSON.parse(JSON.stringify(updated));
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  incrementFlights,
};
