export type Role = 'сотрудник' | 'кладовщик'

export type Status = 'выдача' | 'возврат'

export interface AuthData {
  login: string
  password: string
}

export interface AuthorizedUser extends AuthData {
  id: number
  role: Role
}

export interface AuthForm {
  disabled: boolean
  disabledSubmitBtn: boolean
  values: AuthData
}

export enum Path {
  Applications = '/applications',
  NewApplication = '/newApplication',
  Acceptance = '/acceptance',
  Delivery = '/delivery'
}
