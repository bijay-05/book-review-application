import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response, Application } from 'express';

import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('API is running....');
});


app.use(notFound);
app.use(errorHandler);

export default app;