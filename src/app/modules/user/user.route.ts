import express from 'express'
import { userController } from './user.controller'

const router = express.Router()

router.post('/', userController.createUser)
router.get('/', userController.getUsers)
router.get('/:userId', userController.getSingleUser)
router.put('/:userId', userController.updateSingleUser)
router.delete('/:userId', userController.deleteUser)
router.put('/:userId/orders', userController.addProduct)
router.get('/:userId/orders', userController.getAllOrdersByUser)
router.get('/:userId/orders/total-price', userController.getTotalOrdersPrice)

export const userRouter = router
