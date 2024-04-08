/**
 * Enum representing error types related to customer operations.
 *
 * @enum
 */
export enum CustomerErrorMessageEnum {
  /**
   * Error type indicating that the customer already exists.
   */
  CustomerAlreadyExists = 'Customer already exists!',

  /**
   * Error type indicating that the customer does not exist.
   */
  CustomerDoesNotExist = 'Customer does not exist!',

  /**
   * Error type indicating that no customers were found.
   */
  CustomerNotFound = 'Customers not found',
}
