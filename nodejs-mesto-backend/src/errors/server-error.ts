import { STATUS_CODE_SERVER_ERROR } from './constants';

class ServerError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODE_SERVER_ERROR;
  }
}

export default ServerError;
