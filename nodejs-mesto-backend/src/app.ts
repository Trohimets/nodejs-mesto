import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { celebrate, Joi } from 'celebrate';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import { MESSAGE_SERVER_ERROR, STATUS_CODE_SERVER_ERROR } from './errors/constants';
import auth from './middlewares/auth';
import { createUser, login } from './controllers/users';
import { requestLogger, errorLogger } from './middlewares/logger';

const { errors } = require('celebrate');

require('dotenv').config();

const { PORT } = process.env;
const { DB_LINK } = process.env;

const app = express();

mongoose.connect(DB_LINK || 'mongodb://127.0.0.1:27017/mestodb');

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
app.use(requestLogger);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5).max(15),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^https?:\/\/.+/),
    about: Joi.string().min(2).max(200),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5).max(15),
  }),
}), createUser);
app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use(errorLogger);
app.use(errors());
app.use((req: Request, res: Response, next: NextFunction) => {
  const error: CustomError = new Error('Такого пути не существует');
  error.statusCode = 404;
  next(error);
});
app.use((err: CustomError, req: Request, res: Response, next: NextFunction): void => {
  res.status(err.statusCode || STATUS_CODE_SERVER_ERROR).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
