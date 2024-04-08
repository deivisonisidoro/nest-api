import { Either } from 'src/domain/utils/either/either';
import { RequiredParametersError } from 'src/domain/utils/errors/RequiredParametersError';

export type DeleteCustomerResponse = Either<RequiredParametersError, boolean>;

/**
 * Abstract class for deleting a customer.
 *
 * @abstract
 * @class
 */
export abstract class AbstractDeleteCustomerUseCase {
  /**
   * Deletes a customer by ID.
   * @abstract
   * @param {string} customerId - The ID of the customer to delete.
   * @returns {Promise<DeleteCustomerResponse>} A promise resolving to true if the customer was deleted successfully, false otherwise.
   */
  abstract execute(customerId: string): Promise<DeleteCustomerResponse>;
}
