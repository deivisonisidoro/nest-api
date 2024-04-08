import { CreateCustomerRequestDto } from '../../domain/dtos/customer/Create';
import { ReadCustomersRequestDto } from '../../domain/dtos/customer/ReadCustomers';
import { UpdateCustomerRequestDto } from '../../domain/dtos/customer/Update';
import { Customer } from '../../domain/entities/Customer';

/**
 * Abstract controller providing endpoints for customer management operations.
 */
export abstract class AbstractCustomersController {
  /**
   * Creates a new customer.
   * @param {CreateCustomerRequestDto} createCustomerRequestDto - Data required to create the customer.
   * @returns {Promise<Customer>} A promise resolving to the created customer.
   */
  abstract create(
    createCustomerRequestDto: CreateCustomerRequestDto,
  ): Promise<Customer>;

  /**
   * Retrieves all customers.
   * @param {ReadCustomersRequestDto} query - Data containing parameters for customer retrieval, such as filters and pagination settings.
   * @returns {Promise<Customer[]>} A promise resolving to an array containing all customers.
   */
  abstract getAll(query: ReadCustomersRequestDto): Promise<Customer[]>;

  /**
   * Retrieves a customer by their ID.
   * @param {string} customerId - The ID of the customer to retrieve.
   * @returns {Promise<Customer | null>} A promise resolving to the customer if found, or null if not found.
   */
  abstract getById(customerId: string): Promise<Customer | null>;

  /**
   * Updates an existing customer.
   * @param {string} customerId - The ID of the customer to update.
   * @param {UpdateCustomerRequestDto} updateCustomerRequestDto - Data to update the customer.
   * @returns {Promise<Customer | null>} A promise resolving to the updated customer if found and updated, or null if not found.
   */
  abstract update(
    customerId: string,
    updateCustomerRequestDto: UpdateCustomerRequestDto,
  ): Promise<Customer | null>;

  /**
   * Deletes a customer by their ID.
   * @param {string} customerId - The ID of the customer to delete.
   * @returns {Promise<boolean>} A promise resolving to true if the customer was deleted successfully, false otherwise.
   */
  abstract delete(customerId: string): Promise<boolean>;
}
