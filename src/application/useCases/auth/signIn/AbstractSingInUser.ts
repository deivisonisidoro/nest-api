import { Either } from "../../../../domain/utils/either/either";
import { RequiredParametersError } from "../../../../domain/utils/errors/RequiredParametersError";


export type LoginResponse = Either<RequiredParametersError, { access_token: string }>

/**
 * Abstract class defining the contract for authenticating a user.
 *
 * @abstract
 * @class
 * @implements {AbstractSingInUserUseCase}
 */
export abstract class AbstractSingInUserUseCase {
  /**
   * Signs in a user and generates an access token.
   * @abstract
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<LoginResponse>} A promise resolving to an object containing the access token.
   */
  abstract execute(email: string, password: string): Promise<LoginResponse>;
}
