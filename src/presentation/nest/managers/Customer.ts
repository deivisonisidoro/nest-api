import { CreateCustomerResponse } from 'src/application/useCases/customer/Create/AbstractCreateCustomer';
import { DeleteCustomerResponse } from 'src/application/useCases/customer/Delete/AbstractDeleteCustomer';
import { CustomerResponse } from 'src/application/useCases/customer/Read/AbstractReadCustomer';
import { GetCustomersResponse } from 'src/application/useCases/customer/Read/AbstractReadCustomers';
import { CreateCustomerRequestDto } from 'src/domain/dtos/customer/Create';
import { ReadCustomersRequestDto } from 'src/domain/dtos/customer/ReadCustomers';
import { UpdateCustomerRequestDto } from 'src/domain/dtos/customer/Update';

/**
 * Abstract class defining the contract for a service handling customer operations.
 */
export abstract class AbstractCustomerManager {
  /**
   * Executes the use case to create a new customer.
   * @param {CreateCustomerRequestDto} createCustomerRequestDto - The data required to create the customer.
   * @returns {Promise<CreateCustomerResponse>} A promise resolving to the created customer.
   */
  abstract create(
    createCustomerRequestDto: CreateCustomerRequestDto,
  ): Promise<CreateCustomerResponse>;

  /**
   * Executes the get all customers use case.
   *
   * @async
   * @param {ReadCustomersRequestDto} data - The data containing parameters for customers retrieval, such as filters and pagination settings.
   * @returns {Promise<GetCustomersResponse>} The response data containing customers information.
   */
  abstract getAll(data: ReadCustomersRequestDto): Promise<GetCustomersResponse>;

  /**
   * Retrieves a customer by ID.
   * @param {string} customerId - The ID of the customer to retrieve.
   * @returns {Promise<CustomerResponse>} The customer if found, or null if not found.
   */
  abstract getById(customerId: string): Promise<CustomerResponse>;

  /**
   * Updates an existing customer.
   * @param {string} customerId - The ID of the customer to update.
   * @param {UpdateCustomerRequestDto} updateCustomerRequestDto - The data to update the customer.
   * @returns {Promise<CustomerResponse>} A promise resolving to the updated customer if found and updated, or null if not found.
   */
  abstract update(
    customerId: string,
    updateCustomerRequestDto: UpdateCustomerRequestDto,
  ): Promise<CustomerResponse>;

  /**
   * Deletes a customer by ID.
   * @param {string} customerId - The ID of the customer to delete.
   * @returns {Promise<DeleteCustomerResponse>} A promise resolving to true if the customer was deleted successfully, false otherwise.
   */
  abstract delete(customerId: string): Promise<DeleteCustomerResponse>;
}
