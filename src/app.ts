import 'express-async-errors'
import express, { Request, Response, json } from 'express'
import {clientsRouter} from './routes/clients.routes'
import { contactsRouter } from './routes/contacts.router'
import { GlobalErrors } from './errors/errors.middlewares'
import helmet from 'helmet'
import { loginRouter } from './routes/session.routes'
import { isAuthMiddleware } from './middlewares/isAuth.middlewares'
import cors from 'cors'

export const app = express()
app.use(helmet())
app.use(json())
app.use(cors({
    origin:'http://localhost:5173'
}))

const globalErros = new GlobalErrors()
app.use('/clients',clientsRouter)
app.use('/contacts',isAuthMiddleware, contactsRouter)
app.use('/login',loginRouter)
app.use(globalErros.handleErrors)

