import { UpdateCustomerRequestDto } from '../../../../domain/dtos/customer/Update';
import { Customer } from '../../../../domain/entities/Customer';
import { Either } from '../../../../domain/utils/either/either';
import { RequiredParametersError } from '../../../../domain/utils/errors/RequiredParametersError';

export type CustomerResponse = Either<RequiredParametersError, Customer | null>;

/**
 * Abstract class defining the contract for the use case of updating customer information.
 */
export abstract class AbstractUpdateCustomerUseCase {
  /**
   * Executes the update customer use case asynchronously.
   *
   * @param {string} customerId - The ID of the customer to be updated.
   * @param {UpdateCustomerRequestDto} updateCustomerRequestDto - The updated customer information.
   * @returns {Promise<CustomerResponse>} The response data containing the updated customer information.
   */
  abstract execute(
    customerId: string,
    updateCustomerRequestDto: UpdateCustomerRequestDto,
  ): Promise<CustomerResponse>;
}
