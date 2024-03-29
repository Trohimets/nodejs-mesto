import { STATUS_CODE_CONFLICT } from './constants';

class ConflictError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODE_CONFLICT;
  }
}

export default ConflictError;
