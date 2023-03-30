import { Module, CacheModule as CacheNest } from '@nestjs/common';
import { CacheService } from './cache.service';

@Module({
  imports: [CacheNest.register({
    ttl: 99999999
  }),],
  providers: [CacheService],
  exports: [CacheService]
})
export class CacheModule {}
