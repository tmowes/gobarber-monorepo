import 'reflect-metadata'
import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import routes from './routes'

import './database'
import uploadConfig from './config/upload'
import generalException from './middlewares/generalException'

const app = express()

app.use(json())

app.use('/files', express.static(uploadConfig.directory))

app.use(routes)

// TODO: celebrate
// app.use(errors())

app.use(generalException)

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Server started on port 3333')
})
