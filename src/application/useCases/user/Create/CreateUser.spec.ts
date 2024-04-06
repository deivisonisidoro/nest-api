import { CreateUserRequestDto } from '../../../../domain/dtos/user/Create';
import { User } from '../../../../domain/entities/User';
import { UserErrorMessageEnum } from '../../../../domain/enums/user/ErrorMessage';
import { left } from '../../../../domain/utils/either/either';
import { RequiredParametersError } from '../../../../domain/utils/errors/RequiredParametersError';
import { AbstractPasswordHasher } from '../../../providers/PasswordHasher';
import { AbstractUserRepository } from '../../../repositories/User';
import { CreateUserUseCase } from './CreateUser';

describe('CreateUserUseCase', () => {
  let userRepository: AbstractUserRepository;
  let passwordHasher: AbstractPasswordHasher;
  let createUserUseCase: CreateUserUseCase;
  const createUserRequestDto: CreateUserRequestDto = {
    email: 'test@example.com',
    password: 'password',
    firstName: 'test',
    lastName: 'test',
  };
  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    password: 'password',
    firstName: 'test',
    lastName: 'test',
    createdAt: new Date(),
  };
  const userAlreadyExists = left(
    new RequiredParametersError(UserErrorMessageEnum.UserAlreadyExists, 400),
  );

  beforeEach(() => {
    userRepository = {
      getUser: jest.fn(),
      createUser: jest.fn(),
      getAllUsers: jest.fn(),
      getUserById: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    } as unknown as AbstractUserRepository;

    passwordHasher = {
      hashPassword: jest.fn(),
    } as unknown as AbstractPasswordHasher;

    createUserUseCase = new CreateUserUseCase(userRepository, passwordHasher);
  });

  it('should create a new user when user does not exist', async () => {
    (userRepository.getUser as jest.Mock).mockResolvedValue(null);
    (passwordHasher.hashPassword as jest.Mock).mockResolvedValue(
      'hashedPassword',
    );
    (userRepository.createUser as jest.Mock).mockResolvedValue(mockUser);

    const result = await createUserUseCase.execute(createUserRequestDto);

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual(mockUser);
    expect(userRepository.getUser).toHaveBeenCalledWith({
      email: createUserRequestDto.email,
    });
    expect(passwordHasher.hashPassword).toHaveBeenCalledWith(
      createUserRequestDto.password,
    );
    expect(userRepository.createUser).toHaveBeenCalledWith({
      ...createUserRequestDto,
      password: 'hashedPassword',
    });
  });

  it('should return error when user already exists', async () => {
    (userRepository.getUser as jest.Mock).mockResolvedValue({});

    const result = await createUserUseCase.execute(createUserRequestDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value.constructor).toBe(RequiredParametersError);
    expect(result.value).toStrictEqual(userAlreadyExists.value);
    expect(userRepository.getUser).toHaveBeenCalledWith({
      email: createUserRequestDto.email,
    });
    expect(passwordHasher.hashPassword).not.toHaveBeenCalled();
    expect(userRepository.createUser).not.toHaveBeenCalled();
  });
});
