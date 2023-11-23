import { Request, Response } from 'express'
import { userService } from './user.service'
import { userValidationSchema } from './user.validation'

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

export const userController = {
  createUser,
}
