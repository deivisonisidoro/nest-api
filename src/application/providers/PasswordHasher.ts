/**
 * Abstract class defining a provider responsible for hashing passwords and comparing them.
 */
export abstract class AbstractPasswordHasher {
  /**
   * Hashes the provided password.
   * @async
   * @param {string} password - The password to be hashed.
   * @returns {Promise<string>} A promise resolving to the hashed password.
   */
  abstract hashPassword(password: string): Promise<string>;

  /**
   * Compares the provided password with a hashed password.
   * @async
   * @param {string} password - The password to be compared.
   * @param {string} hashedPassword - The hashed password for comparison.
   * @returns {Promise<boolean>} A promise resolving to a boolean indicating whether the passwords match.
   */
  abstract comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
