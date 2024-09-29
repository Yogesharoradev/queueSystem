import express from 'express';
import connectDB from './lib/db.lib.js';
import { producer } from './lib/kafka.lib.js';
import authRoutes from './router/auth.router.js';
import requestRoutes from './router/queue.router.js';
import  consumeRequests  from './services/kafka.service.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser())

app.use('/auth', authRoutes);
app.use('/request', requestRoutes);

const startServer = async () => {
  try {
    await connectDB();

    await producer.connect();
    consumeRequests();  

    app.listen(3000, () => console.log('Server running on port 3000'));
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();

export {app}