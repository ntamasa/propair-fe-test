const express = require('express');
const airplanes = require('../data/airplanes');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// All airplane routes require JWT
router.use(authMiddleware);

/**
 * GET /api/airplanes
 * Returns all airplanes.
 */
router.get('/', (req, res) => {
  res.json(airplanes.getAll());
});

/**
 * GET /api/airplanes/:id
 * Returns one airplane by id.
 */
router.get('/:id', (req, res) => {
  const airplane = airplanes.getById(req.params.id);
  if (!airplane) {
    return res.status(404).json({ error: 'Airplane not found' });
  }
  res.json(airplane);
});

/**
 * POST /api/airplanes
 * Body: { tailNumber, model, manufacturer, capacity, status?, maintenanceIntervalFlights? }
 * Creates a new airplane. flightsSinceLastMaintenance is always set to 0 (use increment-flights to change it).
 */
router.post('/', (req, res) => {
  const { tailNumber, model, manufacturer, capacity, status, maintenanceIntervalFlights, flightsSinceLastMaintenance } = req.body || {};
  if (!tailNumber || !model || !manufacturer || capacity == null) {
    return res.status(400).json({
      error: 'tailNumber, model, manufacturer, and capacity are required',
    });
  }
  const created = airplanes.create({
    tailNumber,
    model,
    manufacturer,
    capacity,
    status,
    maintenanceIntervalFlights,
    flightsSinceLastMaintenance
  });
  res.status(201).json(created);
});

/**
 * POST /api/airplanes/:id/increment-flights
 * Increments flightsSinceLastMaintenance by 1. If it reaches maintenanceIntervalFlights, sets status to 'maintenance'.
 * Returns the updated airplane.
 */
router.post('/:id/increment-flights', (req, res) => {
  const airplane = airplanes.getById(req.params.id);
  if (!airplane) {
    return res.status(404).json({ error: 'Airplane not found' });
  }
  const updated = airplanes.incrementFlights(req.params.id);
  res.json(updated);
});

/**
 * PUT /api/airplanes/:id
 * Body: { tailNumber?, model?, manufacturer?, capacity?, status? }
 * Updates an existing airplane.
 */
router.put('/:id', (req, res) => {
  const airplane = airplanes.getById(req.params.id);
  if (!airplane) {
    return res.status(404).json({ error: 'Airplane not found' });
  }
  const { tailNumber, model, manufacturer, capacity, status, maintenanceIntervalFlights, flightsSinceLastMaintenance } = req.body || {};
  const updated = airplanes.update(req.params.id, {
    ...(tailNumber != null && { tailNumber }),
    ...(model != null && { model }),
    ...(manufacturer != null && { manufacturer }),
    ...(capacity != null && { capacity }),
    ...(status != null && { status }),
    ...(maintenanceIntervalFlights != null && { maintenanceIntervalFlights }),
    ...(flightsSinceLastMaintenance != null && { flightsSinceLastMaintenance }),
  });
  res.json(updated);
});

/**
 * DELETE /api/airplanes/:id
 * Deletes an airplane.
 */
router.delete('/:id', (req, res) => {
  const airplane = airplanes.getById(req.params.id);
  if (!airplane) {
    return res.status(404).json({ error: 'Airplane not found' });
  }
  airplanes.remove(req.params.id);
  res.status(204).send();
});

module.exports = router;
