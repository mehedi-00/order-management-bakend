import { Model } from 'mongoose'

export type IfullName = {
  firstName: string
  lastName: string
}
type Iaddress = {
  street: string
  city: string
  country: string
}
export type Iorders = {
  productName: string
  price: number
  quantity: number
}

export type Iuser = {
  userId: number
  username: string
  password: string
  fullName: IfullName
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: Iaddress
  orders?: Iorders[]
}

export interface IUserModel extends Model<Iuser> {
  isExistUser(userId: number): Promise<Iuser | null>
}
