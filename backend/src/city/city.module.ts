import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CityEntity } from './entities/city.entity';

@Module({
  imports: [
    CacheModule.register({
      ttl: 99999999
    }),
    TypeOrmModule.forFeature([CityEntity])
  ],
  controllers: [CityController],
  providers: [CityService]
})
export class CityModule {}
