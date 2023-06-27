import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../guards/role.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity]), 
    UserModule, 
    AuthModule, 
    JwtModule
  ],
  providers: [
    CategoryService,
  ],
  controllers: [CategoryController],
  exports: [CategoryService]
})
export class CategoryModule {}
