import { isEqual } from 'date-fns'
import Appointment from '../models/Appointment'

export default class AppointmentsRepository {
  private appointments: Array<Appointment>

  constructor() {
    this.appointments = []
  }

  public create(provider: string, date: Date) {
    const appointment = new Appointment(provider, date)
    this.appointments.push(appointment)
    return appointment
  }

  public findByDate(date: Date): Appointment | undefined {
    return this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    )
  }
}
