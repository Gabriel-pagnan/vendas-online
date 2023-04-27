import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user.service';
import { UserEntity } from '../entities/user.entity';
import { userEntityMock } from '../__mocks__/user.mock';
import { createUserMock } from '../__mocks__/createUser.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock),
          },
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity)
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return user in findUserByEmail', async () => {
    const user = await service.findUserByEmail(userEntityMock.email);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error in findUserByEmail (error DB)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error())

    expect(service.findUserByEmail(userEntityMock.email)).rejects.toThrowError()
  }); 

  it('should return error in getById', async () => {
    const user = await service.getById(userEntityMock.id);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error in getById', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined)

    expect(service.findUserByEmail(userEntityMock.email)).rejects.toThrowError()
  });

  it('should return error in getById (error DB)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error())

    expect(service.getById(userEntityMock.id)).rejects.toThrowError()
  }); 

  it('should return error in getUserReferences', async () => {
    const user = await service.getUserReferences(userEntityMock.id);

    expect(user).toEqual(userEntityMock);
  });
  
  it('should return error if user exist', async () => {
    expect(service.create(createUserMock)).rejects.toThrowError()
  });
  it('should return error if user not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
    const user = await service.create(createUserMock);

    expect(user).toEqual(userEntityMock);
  });
});
