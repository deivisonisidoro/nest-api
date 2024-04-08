import { CreateCustomerRequestDto } from '../../../../domain/dtos/customer/Create';
import { CustomerErrorMessageEnum } from '../../../../domain/enums/customer/ErrorMessage';
import { left, right } from '../../../../domain/utils/either/either';
import { RequiredParametersError } from '../../../../domain/utils/errors/RequiredParametersError';
import { AbstractPasswordHasher } from '../../../providers/PasswordHasher';
import { AbstractCustomerRepository } from '../../../repositories/Customer';
import {
  AbstractCreateCustomerUseCase,
  CreateCustomerResponse,
} from './AbstractCreateCustomer';

/**
 * Use case for creating a new customer.
 *
 * @class
 * @implements {AbstractCreateCustomerUseCase}
 */
export class CreateCustomerUseCase implements AbstractCreateCustomerUseCase {
  /**
   * Creates an instance of CreateCustomerUseCase.
   *
   * @constructor
   * @param {AbstractCustomerRepository} customerRepository - The repository for customer data.
   * @param {AbstractPasswordHasher} passwordHasher - The password hasher provider.
   */
  constructor(
    protected customerRepository: AbstractCustomerRepository,
    protected passwordHasher: AbstractPasswordHasher,
  ) {}

  /**
   * Executes the create customer use case asynchronously.
   *
   * @param {CreateCustomerRequestDto} createCustomerRequestDto - Data representing the request to create a customer.
   * @returns {Promise<CreateCustomerResponse>} A promise resolving to the response data.
   */
  async execute(
    createCustomerRequestDto: CreateCustomerRequestDto,
  ): Promise<CreateCustomerResponse> {
    const customerAlreadyExists = await this.customerRepository.getCustomer({
      email: createCustomerRequestDto.email,
    });
    if (customerAlreadyExists) {
      return left(
        new RequiredParametersError(
          CustomerErrorMessageEnum.CustomerAlreadyExists,
          400,
        ),
      );
    }
    const passwordHashed = await this.passwordHasher.hashPassword(
      createCustomerRequestDto.password,
    );
    const customer = await this.customerRepository.createCustomer({
      ...createCustomerRequestDto,
      password: passwordHashed,
    });
    return right(customer);
  }
}
