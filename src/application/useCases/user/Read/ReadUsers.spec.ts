import { AbstractUserRepository } from "../../../repositories/User";
import { UserErrorMessageEnum } from "../../../../domain/enums/user/ErrorMessage";
import { RequiredParametersError } from "../../../../domain/utils/errors/RequiredParametersError";
import { ReadUsersUseCase } from "./ReadUsers";
import { ReadUsersRequestDto } from "../../../../domain/dtos/user/ReadUsers";
import { User } from "../../../../domain/entities/User";
import { left } from "../../../../domain/utils/either/either";

describe('ReadUsersUseCase', () => {
  let userRepository: AbstractUserRepository;
  let readUsersUseCase: ReadUsersUseCase;
  const userNotFound = left(new RequiredParametersError(UserErrorMessageEnum.UserNotFound, 404));

  beforeEach(() => {
    userRepository = {
      getUsers: jest.fn(),
    } as unknown as AbstractUserRepository;

    readUsersUseCase = new ReadUsersUseCase(userRepository);
  });

  it('should return users when users are found', async () => {
    const usersResponse: User[] = [
      { id: '1', email: 'test1@example.com', password: 'password', firstName: 'test1', lastName: 'test',createdAt: new Date()},
      { id: '2', email: 'test2@example.com', password: 'password', firstName: 'test2', lastName: 'test', createdAt: new Date()},
    ];
    (userRepository.getUsers as jest.Mock).mockResolvedValue(usersResponse);

    const requestData: ReadUsersRequestDto = { /* mock request data */ };
    const result = await readUsersUseCase.execute(requestData);

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual(usersResponse);
    expect(userRepository.getUsers).toHaveBeenCalledWith(requestData);
  });

  it('should return error when no users are found', async () => {
    (userRepository.getUsers as jest.Mock).mockResolvedValue([]);

    const requestData: ReadUsersRequestDto = { /* mock request data */ };
    const result = await readUsersUseCase.execute(requestData);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(RequiredParametersError);
    expect(result.value).toStrictEqual(userNotFound.value);
    expect(userRepository.getUsers).toHaveBeenCalledWith(requestData);
  });
});
