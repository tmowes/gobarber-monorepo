import 'reflect-metadata'
import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import i18next from 'i18next'
import i18nextBackend from 'i18next-node-fs-backend'
import i18nextMiddleware from 'i18next-http-middleware'

import routes from './routes'

import './database'
import uploadConfig from './config/upload'
import generalException from './middlewares/generalException'

i18next
  .use(i18nextBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: `${__dirname}/resources/locales/{{lng}}/{{ns}}.json`,
    },
    fallbackLng: 'en',
    preload: ['pt-BR', 'en'],
  })

const app = express()

app.use(json())

app.use('/files', express.static(uploadConfig.directory))

app.use(i18nextMiddleware.handle(i18next))

app.use(routes)

// TODO: celebrate
// app.use(errors())

app.use(generalException)

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Server started on port 3333')
})
