import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm'
import { appointmentTableName } from '../../models/Appointment'
import { userTableName } from '../../models/User'

export default class AlterProviderToProviderID1601126468408
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(appointmentTableName, 'provider')
    await queryRunner.addColumn(
      appointmentTableName,
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    )
    await queryRunner.createForeignKey(
      appointmentTableName,
      new TableForeignKey({
        name: 'AppointmentProvider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: userTableName,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      appointmentTableName,
      'AppointmentProvider',
    )
    await queryRunner.dropColumn(appointmentTableName, 'provider_id')
    await queryRunner.addColumn(
      appointmentTableName,
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    )
  }
}
