const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.set('trust proxy', 1);

const normalizeOrigin = (value = '') => String(value).trim().replace(/\/+$/, '');

const allowedOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map(origin => normalizeOrigin(origin))
  .filter(Boolean);

if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push(
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5500',
    'http://127.0.0.1:5500'
  );
}

const normalizedAllowedOrigins = new Set(allowedOrigins.map(origin => normalizeOrigin(origin)));

app.use(cors({
  origin(origin, callback) {
    const normalizedOrigin = normalizeOrigin(origin);
    if (!origin || normalizedAllowedOrigins.has(normalizedOrigin) || (process.env.NODE_ENV !== 'production' && origin === 'null')) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked origin: ${origin}`));
  },
  credentials: true
}));
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

if (!process.env.MONGODB_URI) {
  console.error('Missing required environment variable: MONGODB_URI');
  process.exit(1);
}

const contactRoutes = require('./routes/contact');

app.use('/api/contact', contactRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Rachel Portfolio API',
    mongoState: mongoose.connection.readyState
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
