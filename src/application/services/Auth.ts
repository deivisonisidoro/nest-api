import { Either } from "../../domain/utils/either/either";
import { RequiredParametersError } from "../../domain/utils/errors/RequiredParametersError";


export type LoginResponse = Either<RequiredParametersError, { access_token: string }>

/**
 * Abstract service defining the contract for authentication operations.
 */
export abstract class AbstractAuthService {
  /**
   * Signs in a user and generates an access token.
   * @param {string} email - The user's email.
   * @param {string} pass - The user's password.
   * @returns {Promise<LoginResponse>} A promise resolving to an object containing the access token.
   */
  abstract signIn(
    email: string,
    pass: string,
  ): Promise<LoginResponse>;
}
