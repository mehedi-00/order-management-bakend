import { Request, Response } from 'express'
import { userService } from './user.service'
import { userValidationSchema } from './user.validation'
import { User } from '../user.model'

// create user
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const validateUserData = userValidationSchema.parse(userData)
    const result = await userService.createUserIntoDb(validateUserData)
    res.status(200).json({
      success: true,
      message: 'User is created successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
    })
  }
}

//get all Users
const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersIntoDb()
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
    })
  }
}

// get single User
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId
    if (await User.isExistUser(userId)) {
      const result = await userService.getSingleUserIntoDb(userId)
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'User Not Found',
        error: {
          code: 404,
          description: 'User not found',
        },
      })
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
    })
  }
}

export const userController = {
  createUser,
  getUsers,
  getSingleUser,
}
