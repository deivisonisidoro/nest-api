import { Either } from "../../../../domain/utils/either/either";
import { RequiredParametersError } from "../../../../domain/utils/errors/RequiredParametersError";


export type LoginResponse = Either<RequiredParametersError, { access_token: string }>

/**
 * Abstract class for authenticating a user.
 *
 * @abstract
 * @class
 * @implements {AbstractSingInUserUseCase}
 */
export abstract class AbstractSingInUserUseCase {
  /**
   * Signs in a user and generates an access token.
   * @abstract
   * @param {string} email - The user's email.
   * @param {string} pass - The user's password.
   * @returns {Promise<LoginResponse>} A promise resolving to an object containing the access token.
   */
  abstract execute(email: string, pass: string): Promise<LoginResponse>;
}
