import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createTableUser1680114660513 } from './migration/1680114660513-create_table_user';
import { createTableState1680117796741 } from './migration/1680117796741-create_table_state';
import { createTableCity1680117892381 } from './migration/1680117892381-create_table_city';
import { createTableAddress1680117902928 } from './migration/1680117902928-create_table_address';
import { alterTableState1680121623186 } from './migration/1680121623186-alter_table_state';
import { insertInState1680121667606 } from './migration/1680121667606-insert_in_state';
import { insertInCity1675458752231 } from './migration/1680121683934-insert_in_city';
import {alterTableUser1682539835524} from './migration/1682539835524-alter-table-user'
import { UserModule } from './user/user.module';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';
import { CacheModule } from './cache/cache.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/role.guard';
import { createTableCategory1686147411978 } from './migration/1686147411978-create-table-category';
import { createTableProduct1686147440231 } from './migration/1686147440231-create-table-product';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { insertRootInUser1675770516768 } from './migration/1686321704690-insert-root-in-user';
import { createTableCart1675854227354 } from './migration/1688325028110-create-table-cart';
import { CartModule } from './cart/cart.module';
import { crateTableCartProduct1675855589039 } from './migration/1688328071862-create-table-cart-product';
import { CartProductModule } from './cart-product/cart-product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development']
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      autoLoadEntities: true,
      migrations: [
        createTableUser1680114660513,
        createTableState1680117796741,
        createTableCity1680117892381,
        createTableAddress1680117902928,
        alterTableState1680121623186,
        insertInState1680121667606,
        insertInCity1675458752231,
        alterTableUser1682539835524,
        createTableCategory1686147411978,
        createTableProduct1686147440231,
        insertRootInUser1675770516768,
        createTableCart1675854227354,
        crateTableCartProduct1675855589039
      ],
      migrationsRun: true,
    }),
    UserModule,
    StateModule,
    CityModule,
    AddressModule,
    CacheModule,
    AuthModule,
    JwtModule,
    CategoryModule,
    ProductModule,
    CartModule,
    CartProductModule
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: RolesGuard
  }],
})
export class AppModule {}
