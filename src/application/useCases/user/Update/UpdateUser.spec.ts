import { UpdateUserRequestDto } from '../../../../domain/dtos/user/Update';
import { User } from '../../../../domain/entities/User';
import { UserErrorMessageEnum } from '../../../../domain/enums/user/ErrorMessage';
import { left } from '../../../../domain/utils/either/either';
import { RequiredParametersError } from '../../../../domain/utils/errors/RequiredParametersError';
import { AbstractPasswordHasher } from '../../../providers/PasswordHasher';
import { AbstractUserRepository } from '../../../repositories/User';
import { AbstractUpdateUserUseCase } from './AbstractUpdateUser';
import { UpdateUserUseCase } from './UpdateUser';

describe('UpdateUserUseCase', () => {
  let userRepository: AbstractUserRepository;
  let passwordHasher: AbstractPasswordHasher;
  let updateUserUseCase: AbstractUpdateUserUseCase;

  const userId = 'user123';
  const updateUserRequestDto: UpdateUserRequestDto = {
    firstName: 'John',
    lastName: 'Doe',
    password: 'newPassword',
  };
  const mockUser: User = {
    id: userId,
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    password: 'test',
    createdAt: new Date(),
  };
  const userDoesNotExist = left(
    new RequiredParametersError(UserErrorMessageEnum.UserDoesNotExist, 400),
  );

  beforeEach(() => {
    userRepository = {
      getUser: jest.fn(),
      updateUser: jest.fn(),
    } as unknown as AbstractUserRepository;

    passwordHasher = {
      hashPassword: jest.fn(),
    } as unknown as AbstractPasswordHasher;

    updateUserUseCase = new UpdateUserUseCase(userRepository, passwordHasher);
  });

  it('should update user information', async () => {
    (userRepository.getUser as jest.Mock).mockResolvedValue(mockUser);
    (userRepository.updateUser as jest.Mock).mockResolvedValue(mockUser);

    const result = await updateUserUseCase.execute(
      userId,
      updateUserRequestDto,
    );

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual(mockUser);
    expect(userRepository.getUser).toHaveBeenCalledWith({ id: userId });
    expect(userRepository.updateUser).toHaveBeenCalledWith(
      userId,
      updateUserRequestDto,
    );
  });

  it('should return error when user does not exist', async () => {
    (userRepository.getUser as jest.Mock).mockResolvedValue(null);

    const result = await updateUserUseCase.execute(
      userId,
      updateUserRequestDto,
    );

    expect(result.isLeft()).toBe(true);
    expect(result.value.constructor).toBe(RequiredParametersError);
    expect(result.value).toStrictEqual(userDoesNotExist.value);
    expect(userRepository.getUser).toHaveBeenCalledWith({ id: userId });
    expect(passwordHasher.hashPassword).not.toHaveBeenCalled();
    expect(userRepository.updateUser).not.toHaveBeenCalled();
  });
});
