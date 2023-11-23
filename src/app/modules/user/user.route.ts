import express from 'express'
import { userController } from './user.controller'

const router = express.Router()

// Create a new user

router.post('/', userController.createUser)

export const userRouter = router
