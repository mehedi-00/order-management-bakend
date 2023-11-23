import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'
import { IUserModel, IfullName, Iorders, Iuser } from './user/user.interface'
import config from '../config'

const fullnameSchema = new Schema<IfullName>({
  firstName: {
    type: String,
    required: [true, 'firstName is required'],
  },
  lastName: {
    type: String,
    required: [true, 'lastName is required'],
  },
})
const ordersSchema = new Schema<Iorders, IUserModel>({
  productName: {
    type: String,
    required: [true, 'productName is required'],
  },
  price: {
    type: Number,
    required: [true, 'price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'quantity is required'],
  },
})
const userSchema = new Schema<Iuser>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'userId is required'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'username is required'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  fullName: {
    type: fullnameSchema,
    required: [true, 'fullName is required'],
  },
  age: {
    type: Number,
    required: [true, 'age is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: [String],
  address: {
    street: String,
    city: String,
    contry: String,
  },
  orders: [ordersSchema],
})

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

userSchema.statics.isExistUser = async function (userId: number) {
  const isExistUser = await User.findOne({ userId })
  return isExistUser
}

export const User = model<Iuser, IUserModel>('User', userSchema)
