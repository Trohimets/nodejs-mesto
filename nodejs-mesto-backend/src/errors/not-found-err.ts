import { STATUS_CODE_NOT_FOUND } from './constants';

class NotFoundError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODE_NOT_FOUND;
  }
}

export default NotFoundError;
