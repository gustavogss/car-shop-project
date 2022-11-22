import express from 'express';
import ErrorHandler from './Middlaware/ErrorHandler';
import carRouter from './Routes/CarRouter';
import motorcycleRouter from './Routes/MotorcycleRouter';

const app = express();

app.use(express.json());
app.use('/', carRouter);
app.use('/', motorcycleRouter);
app.use(ErrorHandler);

export default app;
