import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { MESSAGE_UNAUTHORIZED } from '../errors/constants';
import UnauthorizedError from '../errors/unauthozied';

require('dotenv').config();

const { JWT_SECRET } = process.env;

interface CustomPayload extends JwtPayload {
  _id: string;
}

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    const unauthorizedError = new UnauthorizedError(MESSAGE_UNAUTHORIZED);
    return next(unauthorizedError);
  }

  const token = authorization.replace('Bearer ', '');
  let payload: CustomPayload;

  try {
    payload = jwt.verify(token, JWT_SECRET || 'my-secret-key') as CustomPayload;
  } catch (err) {
    const unauthorizedError = new UnauthorizedError(MESSAGE_UNAUTHORIZED);
    return next(unauthorizedError);
  }

  req.user = payload;
  next();
};
