import { User } from "../user";
import * as Crypto from 'expo-crypto'

export interface THabito {
  id: string;
  nome_do_habito: string;
  user: User;
};

export const emptyHabito: THabito = {
  id: "",
  nome_do_habito: "",
  user: new User(),
}

export class Habito implements THabito {
  private _data: THabito = { ...emptyHabito }

  constructor(id?: string, nome?: string, user?: User) {
    this._data.id = id ??  Crypto.randomUUID();
    this._data.nome_do_habito = nome || '';
    this._data.user = user || new User();
  }

  get id () {
    return this._data.id
  }
  get nome_do_habito () {
    return this._data.nome_do_habito
  }

  get user () {
    return this._data.user
  }

  set id (value: string) {
    this._data.id = value
  }

  set nome_do_habito (value: string) {
    this._data.nome_do_habito = value
  }

  set user (value: User) {
    this._data.user = value
  }

  get data(): THabito {
    return {
      id: this._data.id,
      nome_do_habito: this._data.nome_do_habito,
      user: this._data.user,
    };
  }

  get datacpy(): THabito {
    return { ...this._data }
  }
}
