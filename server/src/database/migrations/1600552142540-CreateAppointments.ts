import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { appointmentTableName } from '../../models/Appointment'
import { idColumn, timestampColumns } from './utils'

export default class CreateAppointments1600552142540
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
    await queryRunner.createTable(
      new Table({
        name: appointmentTableName,
        columns: [
          idColumn,
          {
            name: 'provider_id',
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
          },
          ...timestampColumns,
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(appointmentTableName)
  }
}
