import { Router } from 'express'
import { parseISO } from 'date-fns'
import AppointmentRepository from '../../repositories/AppointmentsRepository'
import CreateAppointmentService from '../../services/CreateAppointmentService'

const appointmentsRoutes = Router()
const appointmentsRepository = new AppointmentRepository()

appointmentsRoutes.get('/', (_, response) => {
  const appointments = appointmentsRepository.all()
  return response.json(appointments)
})

appointmentsRoutes.post('/', (request, response) => {
  try {
    const { provider, date } = request.body
    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    )

    const appointment = createAppointment.execute({
      provider,
      date: parsedDate,
    })
    return response.json(appointment)
  } catch (err) {
    return response.status(400).json({ message: err.message })
  }
})

export default appointmentsRoutes
