import { ReadCustomersRequestDto } from '../../../../domain/dtos/customer/ReadCustomers';
import { CustomerErrorMessageEnum } from '../../../../domain/enums/customer/ErrorMessage';
import { left, right } from '../../../../domain/utils/either/either';
import { RequiredParametersError } from '../../../../domain/utils/errors/RequiredParametersError';
import { AbstractCustomerRepository } from '../../../repositories/Customer';
import {
  AbstractReadCustomersUseCase,
  GetCustomersResponse,
} from './AbstractReadCustomers';

/**
 * Use case for retrieving all customers.
 *
 * @class
 * @implements {AbstractReadCustomersUseCase}
 */
export class ReadCustomersUseCase implements AbstractReadCustomersUseCase {
  /**
   * Creates an instance of UpdateCustomersUseCase.
   *
   * @constructor
   * @param {AbstractCustomerRepository} customerRepository - The repository for customers data.
   */
  constructor(private customerRepository: AbstractCustomerRepository) {}

  /**
   * Executes the get all customers use case.
   *
   * @async
   * @param {ReadCustomersRequestDto} data - The data containing parameters for customers retrieval, such as filters and pagination settings.
   * @returns {Promise<ResponseDTO>} The response data containing customers information.
   */
  async execute(data: ReadCustomersRequestDto): Promise<GetCustomersResponse> {
    const customers = await this.customerRepository.getCustomers(data);
    if (customers.length === 0) {
      return left(
        new RequiredParametersError(
          CustomerErrorMessageEnum.CustomerNotFound,
          404,
        ),
      );
    }
    return right(customers);
  }
}
