import { isEqual } from 'date-fns'
import { CreateAppointmentDTO } from '../dtos/CreateAppointmentDTO'
import Appointment from '../models/Appointment'

export default class AppointmentsRepository {
  private appointments: Array<Appointment>

  constructor() {
    this.appointments = []
  }

  public all() {
    return this.appointments
  }

  public create(data: CreateAppointmentDTO) {
    const { provider, date } = data
    const appointment = new Appointment({ provider, date })
    this.appointments.push(appointment)
    return appointment
  }

  public findByDate(date: Date): Appointment | undefined {
    return this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    )
  }
}
