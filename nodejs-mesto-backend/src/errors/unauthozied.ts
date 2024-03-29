import { STATUS_CODE_UNAUTHORIZED } from './constants';

class UnauthorizedError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODE_UNAUTHORIZED;
  }
}

export default UnauthorizedError;
