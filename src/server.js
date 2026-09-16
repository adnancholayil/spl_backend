const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

connectDB();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5174';

// Root API Route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SPL Backend API</title>
        <style>
          body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
          .card { background: #1e293b; padding: 2rem 3rem; border-radius: 12px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5); border: 1px solid #334155; text-align: center; }
          h1 { color: #38bdf8; margin-bottom: 0.5rem; }
          p { color: #94a3b8; margin-bottom: 1.5rem; }
          a { color: #38bdf8; text-decoration: none; font-weight: 600; background: #0f172a; padding: 0.6rem 1.2rem; border-radius: 8px; border: 1px solid #334155; display: inline-block; margin: 0.25rem; }
          a:hover { background: #334155; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>SPL Auction Backend API</h1>
          <p>The backend server is running successfully!</p>
          <a href="/api/health">Check API Health (/api/health)</a>
          <a href="${FRONTEND_URL}" target="_blank">Open Frontend (${FRONTEND_URL})</a>
        </div>
      </body>
    </html>
  `);
});

// API Health Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SPL Auction Backend API is running' });
});

// Auth Routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@example.com' && password === 'admin123') {
    return res.json({
      token: 'jwt-mock-backend-token-12345',
      user: { id: 'usr-1', name: 'Platform Admin', email, role: 'ADMIN' }
    });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

// Database Reset Route
app.post('/api/db/clear', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      const collections = mongoose.connection.collections;
      for (const key in collections) {
        await collections[key].deleteMany({});
      }
      return res.json({ success: true, message: 'All MongoDB collections wiped clean.' });
    }
    res.json({ success: true, message: 'Database (offline mode / localStorage) reset ready.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 404 Catch-all Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found', path: req.originalUrl });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`SPL Backend Server running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please stop the existing process on port ${PORT} or specify a different PORT env variable.`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
  }
});

