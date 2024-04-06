/**
 * Represents a user in the system.
 */
export class User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;

  /**
   * Constructs a new User object.
   * @param {string} id - The unique identifier for the user.
   * @param {string} email - The email address of the user.
   * @param {string} firstName - The first name of the user.
   * @param {string} lastName - The last name of the user.
   * @param {string} password - The password of the user.
   * @param {Date} createdAt - The date and time when the user was created.
   */
  constructor(
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    createdAt: Date,
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.createdAt = createdAt;
  }
}
