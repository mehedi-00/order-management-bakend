import express, { Application } from 'express'
import cors from 'cors'
import { userRouter } from './app/modules/user/user.route'
const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

//router middleware here
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app
