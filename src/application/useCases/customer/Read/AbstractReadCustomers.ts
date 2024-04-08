import { ReadCustomersRequestDto } from '../../../../domain/dtos/customer/ReadCustomers';
import { Customer } from '../../../../domain/entities/Customer';
import { Either } from '../../../../domain/utils/either/either';
import { RequiredParametersError } from '../../../../domain/utils/errors/RequiredParametersError';

export type GetCustomersResponse = Either<RequiredParametersError, Customer[]>;

/**
 * Abstract use case for retrieving all customers.
 *
 * @abstract
 * @class
 * @implements {AbstractReadCustomersUseCase}
 */
export abstract class AbstractReadCustomersUseCase
  implements AbstractReadCustomersUseCase
{
  /**
   * Executes the get all customers use case.
   *
   * @async
   * @param {ReadCustomersRequestDto} data - The data containing parameters for customers retrieval, such as filters and pagination settings.
   * @returns {Promise<GetCustomersResponse>} The response data containing customers information.
   */
  abstract execute(
    data: ReadCustomersRequestDto,
  ): Promise<GetCustomersResponse>;
}
