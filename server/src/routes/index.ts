import { Router } from 'express'

const routes = Router()

routes.post('/users', async (request, response) => {
  const { name, email } = request.body
  return response.json({ name, email })
})

export default routes
