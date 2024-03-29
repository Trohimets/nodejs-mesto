export const STATUS_CODE_BAD_REQUEST: number = 400;
export const MESSAGE_BAD_REQUEST_CREATE_USER: string = 'Переданы некорректные данные при создании пользователя';
export const MESSAGE_BAD_REQUEST_CREATE_CARD: string = 'Переданы некорректные данные при создании карточки';
export const MESSAGE_BAD_REQUEST_UPDATE_PROFILE: string = 'Переданы некорректные данные при обновлении профиля';
export const MESSAGE_BAD_REQUEST_UPDATE_AVATAR: string = 'Переданы некорректные данные при обновлении аватара';

export const STATUS_CODE_UNAUTHORIZED: number = 401;
export const MESSAGE_UNAUTHORIZED: string = 'Передан неверный логин или пароль';

export const STATUS_CODE_FORBIDDEN: number = 403;
export const MESSAGE_FORBIDDEN: string = 'Попытка удалить чужую карточку';

export const STATUS_CODE_NOT_FOUND: number = 404;
export const MESSAGE_NOT_FOUND_DELETE_CARD: string = 'Карточка с указанным _id не найдена';
export const MESSAGE_NOT_FOUND_LIKE_CARD: string = 'Передан несуществующий _id карточки';
export const MESSAGE_NOT_FOUND_GET_USER: string = 'Пользователь по указанному _id не найден';
export const MESSAGE_NOT_FOUND_UPDATE_AVATAR: string = 'Пользователь с указанным _id не найден';

export const STATUS_CODE_CONFLICT: number = 409;
export const MESSAGE_CONFLICT: string = 'При регистрации указан email, который уже существует на сервере';

export const STATUS_CODE_SERVER_ERROR: number = 500;
export const MESSAGE_SERVER_ERROR: string = 'На сервере произошла ошибка';

export const EMAIL_INCORRECT: string = 'Неправильный формат адреса электронной почты';
export const LINK_INCORRECT: string = 'Неправильный формат ссылки';
