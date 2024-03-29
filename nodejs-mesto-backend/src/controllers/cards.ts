import { NextFunction, Request, Response } from 'express';
import {
  MESSAGE_FORBIDDEN,
  MESSAGE_NOT_FOUND_DELETE_CARD,
  MESSAGE_NOT_FOUND_LIKE_CARD,
  MESSAGE_SERVER_ERROR,
  STATUS_CODE_SERVER_ERROR,
} from '../errors/constants';
import Card from '../models/card';
import NotFoundError from '../errors/not-found-err';
import ForbiddenError from '../errors/forbidden';

export const getCards = (req: Request, res: Response, next: NextFunction) => Card.find({})
  .then((cards) => res.send({ data: cards }))
  .catch(next);

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(MESSAGE_NOT_FOUND_DELETE_CARD);
      } else {
        if (card.owner.toString() !== req.user._id) {
          throw new ForbiddenError(MESSAGE_FORBIDDEN);
        }

        return Card.findByIdAndDelete(cardId);
      }
    })
    .then((deletedCard) => {
      if (!deletedCard) {
        throw new NotFoundError(MESSAGE_NOT_FOUND_DELETE_CARD);
      } else {
        res.send({ data: deletedCard });
      }
    })
    .catch(next);
};

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  return Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(STATUS_CODE_SERVER_ERROR).send({ message: MESSAGE_SERVER_ERROR }));
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(MESSAGE_NOT_FOUND_LIKE_CARD);
      } else {
        res.send({ data: card });
      }
    })
    .catch(next);
};

export const dislikeCard = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(MESSAGE_NOT_FOUND_LIKE_CARD);
      } else {
        res.send({ data: card });
      }
    })
    .catch(next);
};
