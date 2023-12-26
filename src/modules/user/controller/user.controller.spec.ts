import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '../entity/user.entity';
import { UserService } from '../service/user.service';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    // repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const mockUsers = { id: 2, email: 'test@test.com' };
      jest.spyOn(service, 'findAll').mockResolvedValue([mockUsers]);

      const result = await controller.findAll();

      expect(result).toEqual([mockUsers]);
    });

    it('should return empty array if no user exists', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const mockUser = { id: 2, email: 'test@test.com' };
      jest.spyOn(service, 'findOne').mockResolvedValue(mockUser);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockUser);
    });

    it('should return undefined if user not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(undefined);
      expect(await controller.findOne('1')).toEqual(undefined);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const mockUser = { id: 2, email: 'test@test.com' };
      jest.spyOn(service, 'create').mockResolvedValue(mockUser);

      const result = await controller.create(mockUser);

      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update a user by ID', async () => {
      const mockUser = { id: 2, email: 'test@test.com' };
      jest.spyOn(service, 'update').mockResolvedValue(mockUser);
      const result = await controller.update('2', mockUser);
      expect(result).toEqual(mockUser);
    });

    it('should return undefined if user not found', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(undefined);
      expect(await controller.update('1', { id: 2, email: 'test@test.com' })).toEqual(undefined);
    });
  });

  describe('remove', () => {
    it('should remove a user by ID', async () => {
      const mockUser = { id: 2, email: 'test@test.com' };
      jest.spyOn(service, 'remove').mockResolvedValue(mockUser);

      const result = await controller.remove('1');
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException);
      await expect(controller.remove('1')).rejects.toThrow(NotFoundException);
    });
  });
});