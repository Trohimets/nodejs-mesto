import { STATUS_CODE_BAD_REQUEST } from './constants';

class BadRequestError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODE_BAD_REQUEST;
  }
}

export default BadRequestError;
