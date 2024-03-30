import { AuthService } from '../implementations/Auth';
import { JwtService } from '@nestjs/jwt';
import { AbstractPasswordHasher } from '../../../providers/PasswordHasher';
import { AuthErrorMessageEnum } from '../../../../domain/enums/auth/ErrorMessage';
import { AbstractUserRepository } from '../../../../application/repositories/User';
import { RequiredParametersError } from '../../../../domain/utils/errors/RequiredParametersError';
import { left } from '../../../../domain/utils/either/either';

/**
 * Unit tests for the AuthService class.
 */
describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: AbstractUserRepository;
  let jwtService: JwtService;
  let passwordHasher: AbstractPasswordHasher;
  const emailOrPasswordWrong = left(new RequiredParametersError(AuthErrorMessageEnum.EmailOrPasswordWrong));

  beforeEach(() => {
    // Initialize mock instances
    userRepository = {
      getUserByEmail: jest.fn(),
      createUser: jest.fn(),
      getAllUsers: jest.fn(),
      getUserById: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    } as unknown as AbstractUserRepository;

    jwtService = {
      signAsync: jest.fn(),
    } as unknown as JwtService;

    passwordHasher = {
      comparePasswords: jest.fn(),
    } as unknown as AbstractPasswordHasher;

    // Initialize AuthService instance
    authService = new AuthService(userRepository, jwtService, passwordHasher);
  });

  /**
   * Test suite for the signIn method of the AuthService class.
   */
  describe('signIn', () => {
    /**
     * Test case to verify successful sign-in.
     */
    it('should sign in a user and generate an access token', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
      };

      (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
      (passwordHasher.comparePasswords as jest.Mock).mockResolvedValue(true);
      (jwtService.signAsync as jest.Mock).mockResolvedValue('mockAccessToken');

      const result = await authService.signIn('test@example.com', 'password');

      expect(result.value).toEqual({ access_token: 'mockAccessToken' });
      expect(userRepository.getUserByEmail).toHaveBeenCalledWith('test@example.com');
      expect(passwordHasher.comparePasswords).toHaveBeenCalledWith('password', 'hashedPassword');
      expect(jwtService.signAsync).toHaveBeenCalledWith({ sub: 1, email: 'test@example.com' });
    });

    /**
     * Test case to verify throwing BadRequestException when user with provided email does not exist.
     */
    it('should throw BadRequestException if user with provided email does not exist', async () => {
      (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(undefined);
      const result = await authService.signIn('nonexistent@example.com', 'password')
      
      expect(result.value).toStrictEqual( emailOrPasswordWrong.value);
    });

    /**
     * Test case to verify throwing UnauthorizedException when provided password does not match.
     */
    it('should throw UnauthorizedException if provided password does not match', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
      };
      
      (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
      (passwordHasher.comparePasswords as jest.Mock).mockResolvedValue(false);
      const result = await authService.signIn('test@example.com', 'incorrectPassword')
      
      expect(result.value).toStrictEqual( emailOrPasswordWrong.value);
    });
  });
});
