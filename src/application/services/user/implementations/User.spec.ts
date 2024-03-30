import { UserService } from './User';
import { AbstractUserRepository } from '../../../repositories/User';
import { AbstractPasswordHasher } from '../../../../application/providers/PasswordHasher';
import { UserErrorMessageEnum } from '../../../../domain/enums/user/ErrorMessage';
import { User } from '../../../../domain/entities/User';
import { CreateUserRequestDto } from '../../../../domain/dtos/user/Create';
import { UpdateUserRequestDto } from '../../../../domain/dtos/user/Update';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { RequiredParametersError } from '../../../../domain/utils/errors/RequiredParametersError';
import { left } from '../../../../domain/utils/either/either';


/**
 * Unit tests for the UserService class.
 */
describe('UserService', () => {
  let userService: UserService;
  let userRepository: AbstractUserRepository;
  let passwordHasher: AbstractPasswordHasher;
  const userDoesNotExist = left(new RequiredParametersError(UserErrorMessageEnum.UserDoesNotExist, 400));
  const userNotFound = left(new RequiredParametersError(UserErrorMessageEnum.UserNotFound, 404));
  const userAlreadyExists = left(new RequiredParametersError(UserErrorMessageEnum.UserAlreadyExists, 400));
  const createUserRequestDto: CreateUserRequestDto = {
    email: 'test@example.com',
    password: 'password',
    firstName: 'test',
    lastName: 'test'
  };
  const mockUsers: User[] = [
    { id: '1', email: 'test1@example.com', password: 'password', firstName: 'test1', lastName: 'test',createdAt: new Date()},
    { id: '2', email: 'test2@example.com', password: 'password', firstName: 'test2', lastName: 'test', createdAt: new Date()},
  ];
  const mockUser: User =  { id: '1', email: 'test@example.com', password: 'password', firstName: 'test', lastName: 'test', createdAt: new Date()};

  const updateUserRequestDto: UpdateUserRequestDto = {
    email: 'newemail@example.com',
    password: 'newpassword',
    firstName: 'New Name',
    lastName: 'New Name',
  };


  beforeEach(() => {
    userRepository = {
      getUserByEmail: jest.fn(),
      createUser: jest.fn(),
      getAllUsers: jest.fn(),
      getUserById: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    } as unknown as AbstractUserRepository;

    passwordHasher = {
      hashPassword: jest.fn(),
    } as unknown as AbstractPasswordHasher;

    userService = new UserService(userRepository, passwordHasher);
  });

  describe('create', () => {
    /**
     * Test case to create a new user successfully.
     */
    it('should create a new user', async () => {
      
      (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(null);
      (passwordHasher.hashPassword as jest.Mock).mockResolvedValue('hashedPassword');
      (userRepository.createUser as jest.Mock).mockResolvedValue(mockUser);

      const result = await userService.create(createUserRequestDto);

      expect(result.value).toEqual(mockUser);
      expect(userRepository.getUserByEmail).toHaveBeenCalledWith('test@example.com');
      expect(passwordHasher.hashPassword).toHaveBeenCalledWith('password');
    });

    /**
     * Test case to throw BadRequestException if user with provided email already exists.
     */
    it('should throw BadRequestException if user with provided email already exists', async () => {
      (userRepository.getUserByEmail as jest.Mock).mockResolvedValue({ id: '1', email: 'test@example.com' });
      const result = await userService.create(createUserRequestDto)
      expect(result.value).toStrictEqual(userAlreadyExists.value);
    });
  });

  describe('getAll', () => {
    /**
     * Test case to get all users.
     */
    it('should get all users', async () => {
      
      (userRepository.getAllUsers as jest.Mock).mockResolvedValue(mockUsers);

      const result = await userService.getAll();

      expect(result.value).toEqual(mockUsers);
    });
    /**
     * Test case to throw NotFoundException if no users found.
     */
    it('should throw NotFoundException if no users found', async () => {
      (userRepository.getAllUsers as jest.Mock).mockResolvedValue([]);
      const result = await userService.getAll()
      
      expect(result.value).toStrictEqual(userNotFound.value);
    });
  });

  describe('getById', () => {
    /**
     * Test case to get user by ID.
     */
    it('should get user by ID', async () => {
      
      (userRepository.getUserById as jest.Mock).mockResolvedValue(mockUser);

      const result = await userService.getById('1');

      expect(result.value).toEqual(mockUser);
    });

    /**
     * Test case to throw BadRequestException if user with provided ID does not exist.
     */
    it('should throw BadRequestException if user with provided ID does not exist', async () => {
      (userRepository.getUserById as jest.Mock).mockResolvedValue(null);
      
      const result = await userService.getById('1')
      expect(result.value).toStrictEqual(userDoesNotExist.value);
    });
  });

  describe('getByEmail', () => {
    /**
     * Test case to get user by email.
     */
    it('should get user by email', async () => {
      (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);

      const result = await userService.getByEmail('test@example.com');

      expect(result.value).toEqual(mockUser);
    });
    /**
     * Test case to verify that a BadRequestException is thrown if the user with the provided email does not exist.
     */
    it('should throw BadRequestException if user with provided email does not exist', async () => {
      (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(null);
      const userDoesNotExist = left(new RequiredParametersError(UserErrorMessageEnum.UserDoesNotExist, 400));
      const result = await userService.getByEmail('test@example.com')
      
      expect(result.value).toStrictEqual(userDoesNotExist.value);
    });
  });

  describe('update', () => {
    /**
     * Test case to verify that an existing user is updated.
     */
    it('should update existing user', async () => {
      (userRepository.getUserById as jest.Mock).mockResolvedValue(mockUser);
      (passwordHasher.hashPassword as jest.Mock).mockResolvedValue('hashedPassword');
      (userRepository.updateUser as jest.Mock).mockResolvedValue(updateUserRequestDto);
      
      const result = await userService.update('1', updateUserRequestDto);

      expect(result.value).toEqual(updateUserRequestDto);
      expect(userRepository.getUserById).toHaveBeenCalledWith('1');
      expect(passwordHasher.hashPassword).toHaveBeenCalledWith('newpassword');
      expect(userRepository.updateUser).toHaveBeenCalledWith('1', updateUserRequestDto);
    });
    /**
   * Test case to verify that a BadRequestException is thrown if the user with the provided email does not exist during update.
   */
    it('should throw BadRequestException if user with provided email does not exist', async () => {
      (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(null);
      
      const result = await userService.update('1', updateUserRequestDto)
      expect(result.value).toStrictEqual(userDoesNotExist.value);
    });
  });

  describe('delete', () => {
    /**
     * Test case to verify that a user is deleted by ID.
     */
    it('should delete user by ID', async () => {
      (userRepository.getUserById as jest.Mock).mockResolvedValue(mockUser);
      (userRepository.deleteUser as jest.Mock).mockResolvedValue(true);

      const result = await userService.delete('1');

      expect(result.value).toBe(true);
      expect(userRepository.deleteUser).toHaveBeenCalledWith('1');
    });

    /**
     * Test case to verify that a BadRequestException is thrown if the user with the provided ID does not exist during deletion.
     */
    it('should throw BadRequestException if user with provided ID does not exist', async () => {
      (userRepository.getUserById as jest.Mock).mockResolvedValue(null);
      
      const result = await userService.delete('1')
     
      expect(result.value).toStrictEqual(userDoesNotExist.value);
    });
  });
});
