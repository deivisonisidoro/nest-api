import { ReadCustomersRequestDto } from '../../../../domain/dtos/customer/ReadCustomers';
import { Customer } from '../../../../domain/entities/Customer';
import { CustomerErrorMessageEnum } from '../../../../domain/enums/customer/ErrorMessage';
import { left } from '../../../../domain/utils/either/either';
import { RequiredParametersError } from '../../../../domain/utils/errors/RequiredParametersError';
import { AbstractCustomerRepository } from '../../../repositories/Customer';
import { ReadCustomersUseCase } from './ReadCustomers';

describe('ReadCustomersUseCase', () => {
  let customerRepository: AbstractCustomerRepository;
  let readCustomersUseCase: ReadCustomersUseCase;
  const customerNotFound = left(
    new RequiredParametersError(CustomerErrorMessageEnum.CustomerNotFound, 404),
  );

  beforeEach(() => {
    customerRepository = {
      getCustomers: jest.fn(),
    } as unknown as AbstractCustomerRepository;

    readCustomersUseCase = new ReadCustomersUseCase(customerRepository);
  });

  it('should return customers when customers are found', async () => {
    const customersResponse: Customer[] = [
      {
        id: '1',
        email: 'test1@example.com',
        password: 'password',
        firstName: 'test1',
        lastName: 'test',
        createdAt: new Date(),
      },
      {
        id: '2',
        email: 'test2@example.com',
        password: 'password',
        firstName: 'test2',
        lastName: 'test',
        createdAt: new Date(),
      },
    ];
    (customerRepository.getCustomers as jest.Mock).mockResolvedValue(
      customersResponse,
    );

    const requestData: ReadCustomersRequestDto = {
      /* mock request data */
    };
    const result = await readCustomersUseCase.execute(requestData);

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual(customersResponse);
    expect(customerRepository.getCustomers).toHaveBeenCalledWith(requestData);
  });

  it('should return error when no customers are found', async () => {
    (customerRepository.getCustomers as jest.Mock).mockResolvedValue([]);

    const requestData: ReadCustomersRequestDto = {
      /* mock request data */
    };
    const result = await readCustomersUseCase.execute(requestData);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(RequiredParametersError);
    expect(result.value).toStrictEqual(customerNotFound.value);
    expect(customerRepository.getCustomers).toHaveBeenCalledWith(requestData);
  });
});
