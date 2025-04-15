import * as Crypto from 'expo-crypto'

export interface TUserAttr {
  id: string
  name: string
  email: string
  created_at: Date | null
  isfirstlogin: boolean
}

const emptyUser: TUserAttr = {
  id: '',
  name: '',
  email: '',
  created_at: null,
  isfirstlogin: true
}

export class User implements TUserAttr {
  private _data: TUserAttr = { ...emptyUser }

  constructor(id?: string, email?: string, name?: string, created_at?: Date, isfirstlogin?: boolean) {
    this._data.id = id || Crypto.randomUUID()
    this._data.email = email || ''
    this._data.name = name || ''
    this._data.created_at = created_at || new Date() || null
    this._data.isfirstlogin = true
  }

  get id() {
    return this._data.id
  }

  get name() {
    return this._data.name
  }
  set name(value: string) {
    this._data.name = value
  }

  get email() {
    return this._data.email
  }
  set email(value: string) {
    this._data.email = value
  }

  get created_at() {
    return this._data.created_at
  }
  set created_at(value: Date | null) {
    this._data.created_at = value
  }

  get isfirstlogin() {
    return this._data.isfirstlogin
  }

  set isfirstlogin(value: boolean) {
    this._data.isfirstlogin = value
  }

  get data(): TUserAttr {
    return this._data
  }

  get datacpy(): TUserAttr {
    return { ...this._data }
  }
}
