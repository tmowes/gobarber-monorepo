import 'reflect-metadata'
import express from 'express'
import { json } from 'body-parser'
import routes from './routes'

import './database'
import uploadConfig from './config/upload'

const app = express()

app.use(json())

app.use('/files', express.static(uploadConfig.directory))

app.use(routes)

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Server started on port 3333')
})
