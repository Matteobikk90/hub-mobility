// src/index.ts
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import emailRoutes from './routes/email';

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS setup
app.use(
  cors({
    origin: 'http://localhost:5174/', // Replace with your front-end URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

// Basic route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Use email routes
app.use('/api', emailRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
