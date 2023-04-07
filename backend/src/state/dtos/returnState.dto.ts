import { StateEntity } from "../entities/state.entity";

export class ReturnStateDTO {
    name: number;
    constructor(state: StateEntity) {
        this.name = state.name
    }
}