/**
 * Abstract service defining the contract for authentication operations.
 */
export abstract class AbstractAuthService {
  /**
   * Signs in a user and generates an access token.
   * @param {string} email - The user's email.
   * @param {string} pass - The user's password.
   * @returns {Promise<{ access_token: string }>} A promise resolving to an object containing the access token.
   */
  abstract signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }>;
}
