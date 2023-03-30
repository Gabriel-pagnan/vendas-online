import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateEntity } from './entities/state.entity';

@Injectable()
export class StateService {
    constructor(@InjectRepository(StateEntity)
    private readonly stateRepository: Repository<StateEntity>) {}

    async geAll() {
        return this.stateRepository.find()
    }
}
