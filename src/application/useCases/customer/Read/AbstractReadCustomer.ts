import { Customer } from 'src/domain/entities/Customer';

import { ReadCustomerRequestDto } from '../../../../domain/dtos/customer/ReadCustomer';
import { Either } from '../../../../domain/utils/either/either';
import { RequiredParametersError } from '../../../../domain/utils/errors/RequiredParametersError';

export type CustomerResponse = Either<RequiredParametersError, Customer | null>;

/**
 * Abstract class for GetAllCustomerUseCase.
 *
 */
export abstract class AbstractReadCustomerUseCase {
  /**
   * Executes the get all customers use case.
   *
   * @async
   * @param {ReadCustomerRequestDto} data - The data containing parameters for customer retrieval, such as filters and pagination settings.
   * @returns {Promise<CustomerResponse>} The response data containing customer information.
   */
  abstract execute(data: ReadCustomerRequestDto): Promise<CustomerResponse>;
}
