import { Dia } from '../days/days';
import { Habito } from '../habit/habit';
import { User } from '../user';

export interface THabitoRotinaAttr {
    habito_rotina_id: string;
    habito: Habito;
    dia: Dia;
    horario: string;
};

const emptyUserRoutine: THabitoRotinaAttr = {
    habito_rotina_id: '',
    habito: new Habito('', new User('')),
    dia: new Dia(''),
    horario: ''
}

export class HabitoRotina implements THabitoRotinaAttr {
    private _data: THabitoRotinaAttr = { ...emptyUserRoutine }

    constructor(habito: Habito, dia: Dia, horario: string) {
        this._data.habito_rotina_id = crypto.randomUUID();
        this._data.habito = habito;
        this._data.dia = dia;
        this._data.horario = horario;
    }

    get habito_rotina_id() {
        return this._data.habito_rotina_id
    }

    set habito_rotina_id(value: string) {
        this._data.habito_rotina_id = value
    }

    get habito (){
        return this._data.habito
    }

    set habito (value: Habito){
        this._data.habito = value
    }

    get dia (){
        return this._data.dia
    }

    set dia (value: Dia){
        this._data.dia = value
    }

    get horario (){
        return this._data.horario
    }

    set horario (value: string){
        this._data.horario = value
    }

    get data(): THabitoRotinaAttr{
        return this._data
    }

    get dataCpy(): THabitoRotinaAttr{
        return { ...this.data }
    }

    toDB(): {
        habito_rotina_id: string;
        id_habito: string;
        id_dia: string;
        id_horario: string;
    } {
        return {
            habito_rotina_id: this._data.habito_rotina_id,
            id_habito: this._data.habito.id,
            id_dia: this._data.dia.nome_dia,
            id_horario: this._data.horario,
        };
    }
}
