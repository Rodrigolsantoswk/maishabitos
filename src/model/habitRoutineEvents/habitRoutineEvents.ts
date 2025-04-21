import { HabitoRotina } from '../habitRoutine/habitRoutine';
import * as Crypto from 'expo-crypto'

export interface THabitoRotinaEventsAttr {
    habito_rotina_events_id: string,
    habito_rotina: HabitoRotina,
    data: Date,
    answer: string,
}

const emptyHabitoRoutineEvents: THabitoRotinaEventsAttr = {
    habito_rotina_events_id: '',
    habito_rotina: new HabitoRotina(),
    data: new Date(),
    answer: ''
};

export class HabitoRotinaEvents implements THabitoRotinaEventsAttr {
    private _data: THabitoRotinaEventsAttr = { ...emptyHabitoRoutineEvents };

    constructor(habito_rotina_events_id?: string, habito_rotina?: HabitoRotina, data?: Date, answer?: string) {
        this._data.habito_rotina_events_id = habito_rotina_events_id ?? Crypto.randomUUID();
        this._data.habito_rotina = habito_rotina || new HabitoRotina();
        this._data.data = data || new Date();
        this._data.answer = answer || '';
    }

    get habito_rotina_events_id() {
        return this._data.habito_rotina_events_id;
    }
    
    get habito_rotina() {
        return this._data.habito_rotina;
    }
    
    get data() {
        return this._data.data;
    }

    get answer() {
        return this._data.answer
    }

    set habito_rotina_events_id(value: string) {
        this._data.habito_rotina_events_id = value;
    }
    
    set habito_rotina(value: HabitoRotina) {
        this._data.habito_rotina = value;
    }
    
    set data(value: Date) {
        this._data.data = value;
    }

    set answer(value: string) {
        this._data.answer = value;
    }

    get dataCpy(): THabitoRotinaEventsAttr {
        return { ...this._data };
    }

    toDB(): {
        habito_rotina_events_id: string;
        id_habito_rotina: string;
        data: Date;
    } {
        return {
            habito_rotina_events_id: this._data.habito_rotina_events_id,
            id_habito_rotina: this._data.habito_rotina.habito_rotina_id,
            data: this._data.data
        }
    }
}
