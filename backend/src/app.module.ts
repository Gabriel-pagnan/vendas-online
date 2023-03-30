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
import { UserModule } from './user/user.module';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';

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
        insertInCity1675458752231
      ],
      migrationsRun: true,
    }),
    UserModule,
    StateModule,
    CityModule,
    AddressModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
