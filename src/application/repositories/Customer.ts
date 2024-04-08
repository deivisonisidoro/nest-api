import { CreateCustomerRequestDto } from '../../domain/dtos/customer/Create';
import { ReadCustomerRequestDto } from '../../domain/dtos/customer/ReadCustomer';
import { ReadCustomersRequestDto } from '../../domain/dtos/customer/ReadCustomers';
import { UpdateCustomerRequestDto } from '../../domain/dtos/customer/Update';
import { Customer } from '../../domain/entities/Customer';

/**
 * Abstract class defining the contract for a customer repository providing CRUD operations.
 */
export abstract class AbstractCustomerRepository {
  /**
   * Creates a new customer.
   * @param {CreateCustomerRequestDto} createCustomerRequestDto - Data required to create the customer.
   * @returns {Promise<Customer>} A promise resolving to the created customer.
   */
  abstract createCustomer(
    createCustomerRequestDto: CreateCustomerRequestDto,
  ): Promise<Customer>;

  /**
   * Retrieves a customer.
   * @param {ReadCustomerRequestDto} data - Data identifying the customer to retrieve.
   * @returns {Promise<Customer | null>} A promise resolving to the customer if found, or null if not found.
   */
  abstract getCustomer(data: ReadCustomerRequestDto): Promise<Customer | null>;

  /**
   * Updates a customer.
   * @param {string} customerId - The ID of the customer to update.
   * @param {UpdateCustomerRequestDto} updateCustomerRequestDto - Data to update the customer.
   * @returns {Promise<Customer | null>} A promise resolving to the updated customer if found and updated, or null if not found.
   */
  abstract updateCustomer(
    customerId: string,
    updateCustomerRequestDto: UpdateCustomerRequestDto,
  ): Promise<Customer | null>;

  /**
   * Deletes a customer by ID.
   * @param {string} customerId - The ID of the customer to delete.
   * @returns {Promise<boolean>} A promise resolving to true if the customer was deleted successfully, false otherwise.
   */
  abstract deleteCustomer(customerId: string): Promise<boolean>;

  /**
   * Retrieves all customers.
   * @param {ReadCustomersRequestDto} data - Data containing parameters for customer retrieval, such as filters and pagination settings.
   * @returns {Promise<Customer[]>} A promise resolving to an array containing all customers.
   */
  abstract getCustomers(data: ReadCustomersRequestDto): Promise<Customer[]>;
}
