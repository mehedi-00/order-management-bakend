import bcrypt from 'bcryptjs'
import { Schema, model } from 'mongoose'
import { IUserModel, IfullName, Iorders, Iuser } from './user.interface'
import config from '../../config'

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
const ordersSchema = new Schema<Iorders>({
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
const userSchema = new Schema<Iuser, IUserModel>({
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
    _id: false,
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
    country: String,
  },
  orders: {
    type: [ordersSchema],
    _id: false,
  },
})

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

userSchema.pre('findOneAndUpdate', async function (next) {
  const updateData = this.getUpdate() as any
  if (updateData.password) {
    updateData.password = await bcrypt.hash(
      updateData.password,
      Number(config.bcrypt_salt_rounds),
    )
  }
  next()
})

// creating this hook password and orders hide the response
userSchema.post('save', function (doc, next) {
  doc.set('password', undefined)
  doc.set('orders', undefined)
  next()
})

// using this method  cheak exist user
userSchema.statics.isExistUser = async function (userId: number) {
  const isExistUser = await User.findOne({ userId })
  return isExistUser
}

// using this method  getcalculate total order price
userSchema.statics.totalOrderPrice = async function (userid: number) {
  const result = await this.aggregate([
    { $match: { userId: { $eq: Number(userid) } } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
    { $project: { _id: 0 } },
  ]).exec()
  if (result.length > 0) {
    return {
      totalPrice: result[0].totalPrice,
    }
  } else {
    return {
      totalPrice: 0,
    }
  }
}

export const User = model<Iuser, IUserModel>('User', userSchema)
