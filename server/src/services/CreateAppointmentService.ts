import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import AppError from '../errors/AppError'

import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

interface RequestDTO {
  provider_id: string
  date: Date
}

export default class CreateAppointmentService {
  public async execute({
    provider_id,
    date,
  }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appointmentDate = startOfHour(date)
    const appointmentExists = await appointmentsRepository.findByDate(
      appointmentDate,
    )
    if (appointmentExists) {
      throw new AppError('Appointment already exists')
    }
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    })
    await appointmentsRepository.save(appointment)
    return appointment
  }
}
