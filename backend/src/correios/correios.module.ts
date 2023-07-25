import { Module } from '@nestjs/common';
import { CorreiosService } from './correios.service';
import { CorreiosController } from './correios.controller';
import { HttpModule } from '@nestjs/axios';
import { CityModule } from '../city/city.module';
import { SoapModule } from 'nestjs-soap';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development']
    }),
    SoapModule.register(
      { clientName: 'SOAP_CORREIOS', uri: process.env.URI_SOAP },
    ),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    CityModule
  ],
  providers: [CorreiosService],
  controllers: [CorreiosController],
  exports: [CorreiosService]
})
export class CorreiosModule { }
