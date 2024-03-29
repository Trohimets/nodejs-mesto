import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/unauthozied';
import {
  MESSAGE_BAD_REQUEST_CREATE_USER,
  MESSAGE_CONFLICT,
  MESSAGE_NOT_FOUND_GET_USER,
  MESSAGE_NOT_FOUND_UPDATE_AVATAR,
  MESSAGE_SERVER_ERROR,
  MESSAGE_UNAUTHORIZED,
} from '../errors/constants';
import User from '../models/user';
import NotFoundError from '../errors/not-found-err';
import ConflictError from '../errors/conflict';
import ServerError from '../errors/server-error';
import BadRequestError from '../errors/bad-request';

require('dotenv').config();

const { JWT_SECRET } = process.env;

export const getUsers = (req: Request, res: Response, next: NextFunction) => User.find({})
  .then((users) => res.send({ data: users }))
  .catch(next);

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(MESSAGE_CONFLICT));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(MESSAGE_BAD_REQUEST_CREATE_USER));
      } else {
        next(new ServerError(MESSAGE_SERVER_ERROR));
      }
    });
};

export const getOneUser = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(MESSAGE_NOT_FOUND_GET_USER);
      } else {
        res.send({ data: user });
      }
    })
    .catch(next);
};

export const updateProfile = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(MESSAGE_NOT_FOUND_GET_USER);
      } else {
        res.send({ data: user });
      }
    })
    .catch(next);
};

export const updateAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(MESSAGE_NOT_FOUND_UPDATE_AVATAR);
      } else {
        res.send({ data: user });
      }
    })
    .catch(next);
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  let foundUser: any;

  User.findOne({ email }).select('password')
    .then((user) => {
      foundUser = user;
      if (!user) {
        return Promise.reject(new UnauthorizedError(MESSAGE_UNAUTHORIZED));
      }
      return bcrypt.compare(password, user.password);
    })
    // eslint-disable-next-line consistent-return
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new UnauthorizedError(MESSAGE_UNAUTHORIZED));
      }
      const token = jwt.sign({ _id: foundUser._id }, JWT_SECRET || 'my-secret-key', { expiresIn: '1h' });
      res.send({ token });
    })
    .catch(next);
};

export const getProfile = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(MESSAGE_NOT_FOUND_GET_USER);
      } else {
        res.send({ data: user });
      }
    })
    .catch(next);
};
