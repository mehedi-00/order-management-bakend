import { User } from '../user.model'
import { Iuser } from './user.interface'

//create user
const createUserIntoDb = async (userData: Iuser) => {
  const result = await User.create(userData)
  return result
}

export const userService = {
  createUserIntoDb,
}
