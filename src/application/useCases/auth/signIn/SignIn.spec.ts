import { JwtService } from '@nestjs/jwt';

import { AuthErrorMessageEnum } from '../../../../domain/enums/auth/ErrorMessage';
import { left } from '../../../../domain/utils/either/either';
import { RequiredParametersError } from '../../../../domain/utils/errors/RequiredParametersError';
import { AbstractPasswordHasher } from '../../../providers/PasswordHasher';
import { AbstractCustomerRepository } from '../../../repositories/Customer';
import { SignInUseCase } from './SignIn';

describe('SignInUseCase', () => {
  let customerRepository: AbstractCustomerRepository;
  let jwtService: JwtService;
  let passwordHasher: AbstractPasswordHasher;
  let signInUseCase: SignInUseCase;
  const emailOrPasswordWrong = left(
    new RequiredParametersError(AuthErrorMessageEnum.EmailOrPasswordWrong),
  );

  beforeEach(() => {
    customerRepository = {} as AbstractCustomerRepository;
    jwtService = {} as JwtService;
    passwordHasher = {} as AbstractPasswordHasher;
    signInUseCase = new SignInUseCase(
      customerRepository,
      jwtService,
      passwordHasher,
    );
  });

  describe('execute', () => {
    it('should return an access token when authentication is successful', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const mockCustomer = {
        id: '1',
        email: 'test@example.com',
        password: 'password',
      };
      const mockToken = 'mock-token';
      customerRepository.getCustomer = jest
        .fn()
        .mockResolvedValue(mockCustomer);
      passwordHasher.comparePasswords = jest.fn().mockResolvedValue(true);
      jwtService.signAsync = jest.fn().mockResolvedValue(mockToken);

      const result = await signInUseCase.execute(email, password);

      expect(result.isRight()).toBe(true);
      expect(result.value).toEqual({ access_token: mockToken });
    });

    it('should return an error when the customer does not exist', async () => {
      const email = 'test@example.com';
      const password = 'password';
      customerRepository.getCustomer = jest.fn().mockResolvedValue(null);

      const result = await signInUseCase.execute(email, password);

      expect(result.isLeft()).toBe(true);
      expect(result.value.constructor).toBe(RequiredParametersError);
      expect(result.value).toStrictEqual(emailOrPasswordWrong.value);
    });

    it('should return an error when the password is incorrect', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const mockCustomer = {
        id: '1',
        email: 'test@example.com',
        password: 'password',
      };
      customerRepository.getCustomer = jest
        .fn()
        .mockResolvedValue(mockCustomer);
      passwordHasher.comparePasswords = jest.fn().mockResolvedValue(false);

      const result = await signInUseCase.execute(email, password);

      expect(result.isLeft()).toBe(true);
      expect(result.value.constructor).toBe(RequiredParametersError);
      expect(result.value).toStrictEqual(emailOrPasswordWrong.value);
    });
  });
});
