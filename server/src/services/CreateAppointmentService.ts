import { startOfHour } from 'date-fns'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

interface RequestDTO {
  provider: string
  date: Date
}

export default class CreateAppointmentService {
  private appointmentsRepository

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository
  }

  public execute({ provider, date }: RequestDTO) {
    const appointmentDate = startOfHour(date)
    const appointmentExists = this.appointmentsRepository.findByDate(
      appointmentDate,
    )
    if (appointmentExists) {
      throw new Error('Appointment already exists')
    }
    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    })
    return appointment
  }
}
