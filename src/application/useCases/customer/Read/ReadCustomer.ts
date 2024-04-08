import { ReadCustomerRequestDto } from '../../../../domain/dtos/customer/ReadCustomer';
import { CustomerErrorMessageEnum } from '../../../../domain/enums/customer/ErrorMessage';
import { left, right } from '../../../../domain/utils/either/either';
import { RequiredParametersError } from '../../../../domain/utils/errors/RequiredParametersError';
import { AbstractCustomerRepository } from '../../../repositories/Customer';
import {
  AbstractReadCustomerUseCase,
  CustomerResponse,
} from './AbstractReadCustomer';

/**
 * Use case for retrieving all customers.
 *
 * @class
 * @implements {AbstractReadCustomerUseCase}
 */
export class ReadCustomerUseCase implements AbstractReadCustomerUseCase {
  /**
   * Creates an instance of UpdateCustomerUseCase.
   *
   * @constructor
   * @param {AbstractCustomerRepository} customerRepository - The repository for customer data.
   */
  constructor(private customerRepository: AbstractCustomerRepository) {}

  /**
   * Executes the get all customers use case.
   *
   * @async
   * @param {ReadCustomerRequestDto} data - The data containing parameters for customer retrieval, such as filters and pagination settings.
   * @returns {Promise<ResponseDTO>} The response data containing customer information.
   */
  async execute(data: ReadCustomerRequestDto): Promise<CustomerResponse> {
    const customer = await this.customerRepository.getCustomer(data);
    if (!customer) {
      return left(
        new RequiredParametersError(
          CustomerErrorMessageEnum.CustomerNotFound,
          400,
        ),
      );
    }
    return right(customer);
  }
}
