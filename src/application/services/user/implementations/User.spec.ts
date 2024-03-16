import { UserService } from './User';
import { AbstractUserRepository } from '../../../repositories/User';
import { AbstractPasswordHasher } from '../../../../application/providers/PasswordHasher';
import { UserErrorMessageEnum } from '../../../../domain/enums/user/ErrorMessage';
import { User } from '../../../../domain/entities/User';
import { CreateUserRequestDto } from '../../../../domain/dtos/user/Create';
import { UpdateUserRequestDto } from '../../../../domain/dtos/user/Update';
import { BadRequestException, NotFoundException } from '@nestjs/common';


/**
 * Unit tests for the UserService class.
 */
describe('UserService', () => {
  let userService: UserService;
  let userRepository: AbstractUserRepository;
  let passwordHasher: AbstractPasswordHasher;
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

      expect(result).toEqual(mockUser);
      expect(userRepository.getUserByEmail).toHaveBeenCalledWith('test@example.com');
      expect(passwordHasher.hashPassword).toHaveBeenCalledWith('password');
    });

    /**
     * Test case to throw BadRequestException if user with provided email already exists.
     */
    it('should throw BadRequestException if user with provided email already exists', async () => {
      (userRepository.getUserByEmail as jest.Mock).mockResolvedValue({ id: '1', email: 'test@example.com' });

      await expect(userService.create(createUserRequestDto)).rejects.toThrow(BadRequestException);
      await expect(userService.create(createUserRequestDto)).rejects.toThrow(UserErrorMessageEnum.UserAlreadyExists);
    });
  });

  describe('getAll', () => {
    /**
     * Test case to get all users.
     */
    it('should get all users', async () => {
      
      (userRepository.getAllUsers as jest.Mock).mockResolvedValue(mockUsers);

      const result = await userService.getAll();

      expect(result).toEqual(mockUsers);
    });
    /**
     * Test case to throw NotFoundException if no users found.
     */
    it('should throw NotFoundException if no users found', async () => {
      (userRepository.getAllUsers as jest.Mock).mockResolvedValue([]);

      await expect(userService.getAll()).rejects.toThrow(NotFoundException);
      await expect(userService.getAll()).rejects.toThrow(UserErrorMessageEnum.UserNotFound);
    });
  });

  describe('getById', () => {
    /**
     * Test case to get user by ID.
     */
    it('should get user by ID', async () => {
      
      (userRepository.getUserById as jest.Mock).mockResolvedValue(mockUser);

      const result = await userService.getById('1');

      expect(result).toEqual(mockUser);
    });

    /**
     * Test case to throw BadRequestException if user with provided ID does not exist.
     */
    it('should throw BadRequestException if user with provided ID does not exist', async () => {
      (userRepository.getUserById as jest.Mock).mockResolvedValue(null);

      await expect(userService.getById('1')).rejects.toThrow(BadRequestException);
      await expect(userService.getById('1')).rejects.toThrow(UserErrorMessageEnum.UserDoesNotExist);
    });
  });

  describe('getByEmail', () => {
    /**
     * Test case to get user by email.
     */
    it('should get user by email', async () => {
      (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);

      const result = await userService.getByEmail('test@example.com');

      expect(result).toEqual(mockUser);
    });
    /**
     * Test case to verify that a BadRequestException is thrown if the user with the provided email does not exist.
     */
    it('should throw BadRequestException if user with provided email does not exist', async () => {
      (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(null);

      await expect(userService.getByEmail('test@example.com')).rejects.toThrow(BadRequestException);
      await expect(userService.getByEmail('test@example.com')).rejects.toThrow(UserErrorMessageEnum.UserDoesNotExist);
    });
  });

  describe('update', () => {
    /**
     * Test case to verify that an existing user is updated.
     */
    it('should update existing user', async () => {
      (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
      (passwordHasher.hashPassword as jest.Mock).mockResolvedValue('hashedPassword');
      (userRepository.updateUser as jest.Mock).mockResolvedValue(updateUserRequestDto);

      const result = await userService.update('1', updateUserRequestDto);

      expect(result).toEqual(updateUserRequestDto);
      expect(userRepository.getUserByEmail).toHaveBeenCalledWith('newemail@example.com');
      expect(passwordHasher.hashPassword).toHaveBeenCalledWith('newpassword');
      expect(userRepository.updateUser).toHaveBeenCalledWith('1', updateUserRequestDto);
    });
    /**
   * Test case to verify that a BadRequestException is thrown if the user with the provided email does not exist during update.
   */
    it('should throw BadRequestException if user with provided email does not exist', async () => {
      (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(null);

      await expect(userService.update('1', updateUserRequestDto)).rejects.toThrow(BadRequestException);
      await expect(userService.update('1', updateUserRequestDto)).rejects.toThrow(UserErrorMessageEnum.UserDoesNotExist);
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

      expect(result).toBe(true);
      expect(userRepository.deleteUser).toHaveBeenCalledWith('1');
    });

    /**
     * Test case to verify that a BadRequestException is thrown if the user with the provided ID does not exist during deletion.
     */
    it('should throw BadRequestException if user with provided ID does not exist', async () => {
      (userRepository.getUserById as jest.Mock).mockResolvedValue(null);

      await expect(userService.delete('1')).rejects.toThrow(BadRequestException);
      await expect(userService.delete('1')).rejects.toThrow(UserErrorMessageEnum.UserDoesNotExist);
    });
  });
});
