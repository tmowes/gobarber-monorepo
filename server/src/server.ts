import express from 'express'

const app = express()

app.get('/', async (request, response) => {
  return response.json({ message: 'Hello Julius' })
})

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Server started on port 3333')
})
