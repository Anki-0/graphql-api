import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();

const app = express();

const corsOptions: cors.CorsOptions = {
  origin: [
    '*',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://192.168.1.69:3000',
    'https://studio.apollographql.com',
    'http://localhost:4000'
  ],
  credentials: true // <-- REQUIRED backend setting
};

app.use(express.json({ limit: '10kb' }));
app.use(cors<cors.CorsRequest>(corsOptions));

export default app;
