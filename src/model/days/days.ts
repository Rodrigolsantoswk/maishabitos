export type TDiaAttr = {
  nome_dia: string;
};

const emptyDia: TDiaAttr = {
  nome_dia: ''
}

export class Dia implements TDiaAttr {
  private _data: TDiaAttr = { ...emptyDia }

  constructor(nome: string) {
    this._data.nome_dia = nome;
  }

  get nome_dia() {
    return this._data.nome_dia
  }

  set nome_dia(value: string) {
    this._data.nome_dia = value
  }

  get datacpy(): TDiaAttr {
    return { ...this._data }
  }

  get data(): TDiaAttr {
    return this._data
  }
}
