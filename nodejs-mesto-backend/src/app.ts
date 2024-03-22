import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/users';
import cardRouter from './routes/cards';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());

declare global {
  namespace Express {
    interface Request {
      user: { _id: string }; // Определение нового свойства user для мидлвара-заглушки
    }
  }
}

interface CustomError extends Error {
  statusCode?: number;
}

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '65fb1f6b77ded3aeee5c16b0',
  };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use((err: CustomError, req: Request, res: Response) => {
  res.status(err.statusCode || 500).send({ message: err.message || 'На сервере произошла ошибка' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
