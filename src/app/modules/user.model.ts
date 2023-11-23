import { Schema, model } from 'mongoose'
import { Iuser } from './user/user.interface'

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
    firstName: {
      type: String,
      required: [true, 'firstName is required'],
    },
    lastName: {
      type: String,
      required: [true, 'lastName is required'],
    },
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
  orders: [
    {
      productName: String,
      price: Number,
      quantity: Number,
    },
  ],
})

export const User = model<Iuser>('User', userSchema)
