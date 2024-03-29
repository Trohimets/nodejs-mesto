import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getUsers, getOneUser, updateProfile, updateAvatar, getProfile,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getOneUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
  }),
}), updateProfile);
router.get('/me', getProfile);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^https?:\/\/.+/),
  }),
}), updateAvatar);

export default router;
