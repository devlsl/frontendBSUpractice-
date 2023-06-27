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
  Delivery = '/delivery',
  BorrowedItemsByUser = '/borrowedItemsByUser',
  ItemsLog = '/items/log',
  itemsPanel = '/items/panel'
}

export interface Item {
  id: number
  name: string
}

export interface CountedItem extends Item {
  count: number
}

export type ApplicationItemStatus = 'Выполнена' | 'Используется' | 'В обработке'

export interface ApplicationItem extends CountedItem {
  name: string
  count: number
  itemId: number
  applicationId: number
  status: ApplicationItemStatus
}

export interface AcceptanceItem {
  itemId: number
  name: string
  applicationId: number
  clientLogin: string
  comment: string
  date: string
}

export interface ActiveApplicationItem {
  applicationId: number
  items: CountedItem[]
}
