import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

interface RequestDTO {
  provider: string
  date: Date
}

export default class CreateAppointmentService {
  public async execute({ provider, date }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appointmentDate = startOfHour(date)
    const appointmentExists = await appointmentsRepository.findByDate(
      appointmentDate,
    )
    if (appointmentExists) {
      throw new Error('Appointment already exists')
    }
    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    })
    await appointmentsRepository.save(appointment)
    return appointment
  }
}
