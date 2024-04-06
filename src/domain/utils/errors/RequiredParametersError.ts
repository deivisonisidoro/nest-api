/**
 * Represents an error indicating missing required parameters.
 */
export class RequiredParametersError extends Error {
  private _message: string;
  private _statusCode: number;

  /**
   * Constructs a new RequiredParametersError instance.
   * @param {string} message - The error message.
   * @param {number} statusCode - The status code associated with the error (default is 500).
   */
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this._message = message;
    this._statusCode = statusCode;
  }

  /**
   * Retrieves the error message.
   * @returns {string} The error message.
   */
  get message(): string {
    return this._message;
  }

  /**
   * Retrieves the status code associated with the error.
   * @returns {number} The status code.
   */
  get statusCode(): number {
    return this._statusCode;
  }
}
