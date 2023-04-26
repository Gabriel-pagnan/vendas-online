import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user.service';
import { UserEntity } from '../entities/user.entity';
import { userEntityMock } from '../__mocks__/user.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            getAll: jest.fn().mockResolvedValue(userEntityMock),
            create: jest.fn().mockResolvedValue(userEntityMock),
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

  it('should return user in getByEmail', async () => {
    const user = await service.getByEmail(userEntityMock.email);

    expect(user).toEqual(userEntityMock);
  });
});
