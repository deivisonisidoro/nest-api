import { randomUUID } from 'crypto';

import { ReadUserRequestDto } from '../../../../domain/dtos/user/ReadUser';
import { UserErrorMessageEnum } from '../../../../domain/enums/user/ErrorMessage';
import { left } from '../../../../domain/utils/either/either';
import { RequiredParametersError } from '../../../../domain/utils/errors/RequiredParametersError';
import { AbstractUserRepository } from '../../../repositories/User';
import { ReadUserUseCase } from './ReadUser';

describe('ReadUserUseCase', () => {
  let userRepository: AbstractUserRepository;
  let readUserUseCase: ReadUserUseCase;
  const userNotFound = left(
    new RequiredParametersError(UserErrorMessageEnum.UserNotFound, 404),
  );

  beforeEach(() => {
    userRepository = {
      getUser: jest.fn(),
    } as unknown as AbstractUserRepository;

    readUserUseCase = new ReadUserUseCase(userRepository);
  });

  it('should return user response when user exists', async () => {
    const mockUserResponse = { id: '1', name: 'John Doe' };
    const mockReadUserRequestDto: ReadUserRequestDto = {
      email: 'John.Doe@example.com',
      id: randomUUID(),
    };

    (userRepository.getUser as jest.Mock).mockResolvedValue(mockUserResponse);

    const result = await readUserUseCase.execute(mockReadUserRequestDto);

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual(mockUserResponse);
    expect(userRepository.getUser).toHaveBeenCalledWith(mockReadUserRequestDto);
  });

  it('should return error when user does not exist', async () => {
    const mockReadUserRequestDto: ReadUserRequestDto = {
      email: 'John.Doe@example.com',
      id: randomUUID(),
    };

    (userRepository.getUser as jest.Mock).mockResolvedValue(null);

    const result = await readUserUseCase.execute(mockReadUserRequestDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value.constructor).toBe(RequiredParametersError);
    expect(result.value).toStrictEqual(userNotFound.value);
    expect(userRepository.getUser).toHaveBeenCalledWith(mockReadUserRequestDto);
  });
});
