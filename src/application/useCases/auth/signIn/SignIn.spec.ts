import { JwtService } from "@nestjs/jwt";
import { AbstractPasswordHasher } from "../../../providers/PasswordHasher";
import { AbstractUserRepository } from "../../../repositories/User";
import { AuthErrorMessageEnum } from "../../../../domain/enums/auth/ErrorMessage";
import { RequiredParametersError } from "../../../../domain/utils/errors/RequiredParametersError";
import { left } from "../../../../domain/utils/either/either";
import { SignInUseCase } from "./SignIn";

describe('SignInUseCase', () => {
  let userRepository: AbstractUserRepository;
  let jwtService: JwtService;
  let passwordHasher: AbstractPasswordHasher;
  let signInUseCase: SignInUseCase;
  const emailOrPasswordWrong = left(new RequiredParametersError(AuthErrorMessageEnum.EmailOrPasswordWrong));


  beforeEach(() => {
    userRepository = {} as AbstractUserRepository;
    jwtService = {} as JwtService;
    passwordHasher = {} as AbstractPasswordHasher;
    signInUseCase = new SignInUseCase(userRepository, jwtService, passwordHasher);
  });

  describe('execute', () => {
    it('should return access token when authentication is successful', async () => {
      const email = 'test@example.com';
      const pass = 'password';
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: 'password',
      };
      const mockToken = 'mock-token';
      userRepository.getUser = jest.fn().mockResolvedValue(mockUser);
      passwordHasher.comparePasswords = jest.fn().mockResolvedValue(true);
      jwtService.signAsync = jest.fn().mockResolvedValue(mockToken);

      const result = await signInUseCase.execute(email, pass);

      expect(result.isRight()).toBe(true);
      expect(result.value).toEqual({ access_token: mockToken });
    });

    it('should return error when user does not exist', async () => {
      const email = 'test@example.com';
      const pass = 'password';
      userRepository.getUser = jest.fn().mockResolvedValue(null);

      const result = await signInUseCase.execute(email, pass);

      expect(result.isLeft()).toBe(true);
      expect(result.value.constructor).toBe(RequiredParametersError);
      expect(result.value).toStrictEqual( emailOrPasswordWrong.value);
    });

    it('should return error when password is incorrect', async () => {
      const email = 'test@example.com';
      const pass = 'password';
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: 'password',
      };
      userRepository.getUser = jest.fn().mockResolvedValue(mockUser);
      passwordHasher.comparePasswords = jest.fn().mockResolvedValue(false);

      const result = await signInUseCase.execute(email, pass);

      expect(result.isLeft()).toBe(true);
      expect(result.value.constructor).toBe(RequiredParametersError);
      expect(result.value).toStrictEqual( emailOrPasswordWrong.value);
    });
  });
});
