import { User } from '../user.model'
import { Iorders, Iuser } from './user.interface'

//create user
const createUserIntoDb = async (userData: Iuser) => {
  const result = await User.create(userData)
  return result
}
// get all users
const getAllUsersIntoDb = async () => {
  const result = await User.find(
    {},
    { _id: 0, username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  )
  return result
}

// get single user by userId
const getSingleUserIntoDb = async (userId: number) => {
  const result = await User.findOne({ userId }, { password: 0, _id: 0 })
  return result
}

// update single user information
const updateSingleUserIntoDb = async (
  userId: number,
  updatedUserData: Iuser,
) => {
  const result = await User.updateOne({ userId }, updatedUserData, {
    new: true,
    runValidators: true,
  })
  return result
}

// delete user
const deleteUserIntoDb = async (userId: number) => {
  const result = await User.deleteOne({ userId })
  return result
}

// add order
const addOrderIntoDb = async (userId: number, productData: Iorders) => {
  const existUserAndOrders = await User.findOne({
    $and: [{ userId }, { orders: { $exists: true } }],
  })
  if (existUserAndOrders) {
    const result = await User.updateOne(
      { userId },
      {
        $push: {
          orders: productData,
        },
      },
    )
    return result
  } else {
    const result = await User.updateOne(
      { userId },
      {
        $addToSet: {
          orders: productData,
        },
      },
    )
    return result
  }
}

// get all orders by a specific user

const getAllOrdersByUserIntoDb = async (userId: number) => {
  const result = await User.findOne(
    {
      $and: [
        { userId },
        { $and: [{ orders: { $exists: true } }, { orders: { $ne: [] } }] },
      ],
    },
    { _id: 0, orders: 1 },
  )
  return result
}

export const userService = {
  createUserIntoDb,
  getAllUsersIntoDb,
  getSingleUserIntoDb,
  updateSingleUserIntoDb,
  deleteUserIntoDb,
  addOrderIntoDb,
  getAllOrdersByUserIntoDb,
}
