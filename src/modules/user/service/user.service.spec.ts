import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { async, NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';
import User from '../entity/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  const mockRepo = {
    create: jest.fn().mockImplementation(user => user),
    save: jest.fn().mockImplementation((user) => Promise.resolve({ id: Date.now(), ...user })),
    update: jest.fn().mockImplementation((user) => Promise.resolve({ id: Date.now() })),
    findOne: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, {
        provide: getRepositoryToken(User),
        useClass: Repository,
      }],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a user with valid details', async () => {
      const newUser = { id: 1, email: 'test@test.com' };
      jest.spyOn(repository, 'create').mockReturnValue(newUser);
      jest.spyOn(repository, 'save').mockResolvedValue(newUser);

      expect(await service.create(newUser)).toEqual(newUser);
    });
  });

  describe('update', () => {
    it('should update a user with valid details', async () => {
      const updatedUser = { id: 2, email: 'test@test.com' };
      jest.spyOn(repository, 'update').mockResolvedValue(undefined);
      jest.spyOn(repository, 'findOne').mockResolvedValue(updatedUser);

      expect(await service.update(2, updatedUser)).toEqual(updatedUser);
    });
  });

  describe('delete', () => {
    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);
      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    })

    it('should remove a valid user', async () => {
      const user = { id: 1, email: 'test@test.com' }
      jest.spyOn(repository, 'findOne').mockResolvedValue(user);
      jest.spyOn(repository, 'delete').mockResolvedValue(undefined);
      expect(await service.remove(1)).toEqual(user);
    })
  })

  describe('update', () => {
    it('should update a user with valid details', async () => {
      const updatedUser = { id: 2, email: 'test@test.com' };
      jest.spyOn(repository, 'update').mockResolvedValue(undefined);
      jest.spyOn(repository, 'findOne').mockResolvedValue(updatedUser);

      expect(await service.update(2, updatedUser)).toEqual(updatedUser);
    });
  });

  describe('Find one', () => {
    it('should find user if he/she exists', async () => {
      const user = { id: 2, email: 'test@test.com' };
      jest.spyOn(repository, 'findOne').mockResolvedValue(user);
      expect(await service.findOne(2)).toEqual(user);
    });

    it('should return undefined if no user exists', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);
      expect(await service.findOne(2)).toEqual(undefined);
    });
  });

  describe('Find all user', () => {
    it('should find all users', async () => {
      const user = { id: 2, email: 'test@test.com' };
      jest.spyOn(repository, 'find').mockResolvedValue([user]);
      expect(await service.findAll()).toEqual([user]);
    });

    it('should return empty array if no user found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);
      expect(await service.findAll()).toEqual([]);
    });
  });

  // it('should update a user with valid details', async () => {
  //   const userDetails = await service.create({ email: 'test@test.com' });

  //   expect(await service.update(userDetails.id, { id: userDetails.id, email: 'test@test.com' })).toEqual({
  //     id: userDetails.id,
  //   })
  // });

});
