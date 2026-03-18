const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const airplaneRoutes = require('./routes/airplanes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/airplanes', airplaneRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Airplane API is running' });
});

app.listen(PORT, () => {
  console.log(`Airplane API listening on http://localhost:${PORT}`);
  console.log('  GET  /health');
  console.log('  POST /api/auth/login');
  console.log('  GET  /api/airplanes (auth)');
  console.log('  GET  /api/airplanes/:id (auth)');
  console.log('  POST /api/airplanes (auth)');
  console.log('  POST /api/airplanes/:id/increment-flights (auth)');
  console.log('  PUT  /api/airplanes/:id (auth)');
  console.log('  DELETE /api/airplanes/:id (auth)');
});
