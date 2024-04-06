import { UserErrorMessageEnum } from '../../../../domain/enums/user/ErrorMessage';
import { left } from '../../../../domain/utils/either/either';
import { RequiredParametersError } from '../../../../domain/utils/errors/RequiredParametersError';
import { AbstractUserRepository } from '../../../repositories/User';
import { DeleteUserUseCase } from './DeleteUser';

describe('DeleteUserUseCase', () => {
  let userRepository: AbstractUserRepository;
  let deleteUserUseCase: DeleteUserUseCase;
  const userDoesNotExist = left(
    new RequiredParametersError(UserErrorMessageEnum.UserDoesNotExist, 400),
  );

  beforeEach(() => {
    userRepository = {
      getUser: jest.fn(),
      deleteUser: jest.fn(),
    } as unknown as AbstractUserRepository;

    deleteUserUseCase = new DeleteUserUseCase(userRepository);
  });

  it('should return error when user does not exist', async () => {
    (userRepository.getUser as jest.Mock).mockResolvedValue(null);

    const result = await deleteUserUseCase.execute('user_id');

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(RequiredParametersError);
    expect(result.value).toStrictEqual(userDoesNotExist.value);
    expect(userRepository.getUser).toHaveBeenCalledWith({ id: 'user_id' });
    expect(userRepository.deleteUser).not.toHaveBeenCalled();
  });

  it('should return true when user is deleted successfully', async () => {
    (userRepository.getUser as jest.Mock).mockResolvedValue({});
    (userRepository.deleteUser as jest.Mock).mockResolvedValue(true);

    const result = await deleteUserUseCase.execute('user_id');

    expect(result.isRight()).toBe(true);
    expect(result.value).toBe(true);
    expect(userRepository.getUser).toHaveBeenCalledWith({ id: 'user_id' });
    expect(userRepository.deleteUser).toHaveBeenCalledWith('user_id');
  });

  it('should return false when user deletion fails', async () => {
    (userRepository.getUser as jest.Mock).mockResolvedValue({});
    (userRepository.deleteUser as jest.Mock).mockResolvedValue(false);

    const result = await deleteUserUseCase.execute('user_id');

    expect(result.isRight()).toBe(true);
    expect(result.value).toBe(false);
    expect(userRepository.getUser).toHaveBeenCalledWith({ id: 'user_id' });
    expect(userRepository.deleteUser).toHaveBeenCalledWith('user_id');
  });
});
