export class RequiredParametersError extends Error {
  private _message: string;
  private _statusCode: number;

  constructor(message: string, statusCode: number = 500) {
      super(message);
      this._message = message;
      this._statusCode = statusCode;
  }
  get message(): string {
    return this._message;
  }
  get statusCode(): number {
    return this._statusCode;
  }
}
