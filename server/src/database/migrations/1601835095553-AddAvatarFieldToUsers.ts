import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'
import { userTableName } from '../../models/User'

export default class AddAvatarFieldToUsers1601835095553
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      userTableName,
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(userTableName, 'avatar')
  }
}
