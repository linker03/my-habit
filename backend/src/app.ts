import express from 'express';
import cors from 'cors';
import { habitRoutes } from './routes/habit.routes';
import { errorHandler } from './middlewares/errorHandler';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/habits', habitRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use(errorHandler);
