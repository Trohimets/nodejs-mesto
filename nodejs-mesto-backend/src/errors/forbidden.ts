import { STATUS_CODE_FORBIDDEN } from './constants';

class ForbiddenError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODE_FORBIDDEN;
  }
}

export default ForbiddenError;
