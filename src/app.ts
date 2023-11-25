import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { userRouter } from './app/modules/user/user.route'
const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

//router middleware here
app.use('/api/users', userRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'router is not available',
  })
})

export default app
