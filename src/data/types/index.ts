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
  id: number // инвентарный номер
  name: string
}

export interface TypedItem {
  itemTypeId: number
  name: string
}

export interface CertainItem extends TypedItem {
  itemId: number
}

export interface OptionalCertainItem extends TypedItem {
  itemId: number
}

export interface CountedItem {
  count: number
}

export type ApplicationItemStatus = 'Выполнена' | 'Используется' | 'В обработке'

export interface ApplicationItem extends CountedItem, TypedItem {
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

export interface CountedTypedItem extends CountedItem, TypedItem {}

export interface ActiveApplication {
  applicationId: number
  items: CountedTypedItem[]
  client: {
    id: number
    login: string
  }
}

export interface DeliveringItem {
  applicationId: number
  itemId: number
  itemTypeId: number
}

export interface LogItem {
  itemId: number
  applicationId: number
  clientLogin: string
  comment: string
  name: string
  status: string
  date: string
}

// export type AvailableItem = CertainItem

// export type ActiveApplicationsAndAvailableItems = {
//   applications: ActiveApplication[]
//   items: AvailableItem
// }
