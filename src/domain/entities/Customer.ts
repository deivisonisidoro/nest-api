/**
 * Represents a customer in the system.
 */
export class Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;

  /**
   * Constructs a new Customer object.
   * @param {string} id - The unique identifier for the customer.
   * @param {string} email - The email address of the customer.
   * @param {string} firstName - The first name of the customer.
   * @param {string} lastName - The last name of the customer.
   * @param {string} password - The password of the customer.
   * @param {Date} createdAt - The date and time when the customer was created.
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
