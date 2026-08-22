import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import usuariosRouter from './routes/usuarios.js';
import hostsRouter from './routes/hosts.js';

import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Em produção, aceita apenas a origem do frontend (Vercel).
// Em dev, aceita qualquer origem (FRONTEND_URL não está definida).
const allowedOrigin = process.env.FRONTEND_URL || '*';
app.use(cors({ origin: allowedOrigin }));
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.json({ status: 'ok', app: 'EasyHost API' });
});

app.use('/usuarios', usuariosRouter);
app.use('/hosts', hostsRouter);

app.use(errorHandler);

export default app;
