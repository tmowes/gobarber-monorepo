import { Router } from 'express'
import { startOfHour, parseISO } from 'date-fns'
import AppointmentRepository from '../../repositories/AppointmentsRepository'

const appointmentsRoutes = Router()
const appointmentsRepository = new AppointmentRepository()

appointmentsRoutes.get('/', (request, response) => {
  const appointments = appointmentsRepository.all()
  return response.json(appointments)
})

appointmentsRoutes.post('/', (request, response) => {
  const { provider, date } = request.body
  const parsedDate = startOfHour(parseISO(date))

  const appointmentsExists = appointmentsRepository.findByDate(parsedDate)

  if (appointmentsExists) {
    return response.status(409).json({ message: 'Appointment already exists' })
  }
  const appointment = appointmentsRepository.create({
    provider,
    date: parsedDate,
  })
  return response.json(appointment)
})

export default appointmentsRoutes
