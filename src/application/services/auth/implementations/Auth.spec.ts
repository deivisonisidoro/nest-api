import { AuthService } from '../implementations/Auth';
import { AbstractUserService } from '../../user/User';
import { JwtService } from '@nestjs/jwt';
import { AbstractPasswordHasher } from '../../../providers/PasswordHasher';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthErrorMessageEnum } from '../../../../domain/enums/auth/ErrorMessage';

/**
 * Unit tests for the AuthService class.
 */
describe('AuthService', () => {
  let authService: AuthService;
  let userService: AbstractUserService;
  let jwtService: JwtService;
  let passwordHasher: AbstractPasswordHasher;

  beforeEach(() => {
    // Initialize mock instances
    userService = {
      getByEmail: jest.fn(),
    } as unknown as AbstractUserService;

    jwtService = {
      signAsync: jest.fn(),
    } as unknown as JwtService;

    passwordHasher = {
      comparePasswords: jest.fn(),
    } as unknown as AbstractPasswordHasher;

    // Initialize AuthService instance
    authService = new AuthService(userService, jwtService, passwordHasher);
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

      (userService.getByEmail as jest.Mock).mockResolvedValue(mockUser);
      (passwordHasher.comparePasswords as jest.Mock).mockResolvedValue(true);
      (jwtService.signAsync as jest.Mock).mockResolvedValue('mockAccessToken');

      const result = await authService.signIn('test@example.com', 'password');

      expect(result).toEqual({ access_token: 'mockAccessToken' });
      expect(userService.getByEmail).toHaveBeenCalledWith('test@example.com');
      expect(passwordHasher.comparePasswords).toHaveBeenCalledWith('password', 'hashedPassword');
      expect(jwtService.signAsync).toHaveBeenCalledWith({ sub: 1, email: 'test@example.com' });
    });

    /**
     * Test case to verify throwing BadRequestException when user with provided email does not exist.
     */
    it('should throw BadRequestException if user with provided email does not exist', async () => {
      (userService.getByEmail as jest.Mock).mockResolvedValue(undefined);

      await expect(authService.signIn('nonexistent@example.com', 'password')).rejects.toThrow(BadRequestException);
      await expect(authService.signIn('nonexistent@example.com', 'password')).rejects.toThrow(
        new BadRequestException(AuthErrorMessageEnum.EmailOrPasswordWrong)
      );
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
      
      (userService.getByEmail as jest.Mock).mockResolvedValue(mockUser);
      (passwordHasher.comparePasswords as jest.Mock).mockResolvedValue(false);

      await expect(authService.signIn('test@example.com', 'incorrectPassword')).rejects.toThrow(UnauthorizedException);
      await expect(authService.signIn('test@example.com', 'incorrectPassword')).rejects.toThrow(
        new UnauthorizedException(AuthErrorMessageEnum.EmailOrPasswordWrong)
      );
    });
  });
});
