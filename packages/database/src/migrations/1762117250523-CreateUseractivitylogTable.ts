import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateUseractivitylogTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_activity_logs',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'action',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'timestamp',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          }
        ],
      }),
      true
    );


    await queryRunner.createForeignKey(
      'user_activity_logs',
      new TableForeignKey({
        name: 'fk_user_activity_logs_user_id',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'user_activity_logs',
      new TableIndex({
        name: 'idx_user_activity_logs_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'user_activity_logs',
      new TableIndex({
        name: 'idx_user_activity_logs_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'user_activity_logs',
      new TableIndex({
        name: 'idx_user_activity_logs_timestamp',
        columnNames: ['timestamp'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('user_activity_logs', 'idx_user_activity_logs_user_id');
    await queryRunner.dropIndex('user_activity_logs', 'idx_user_activity_logs_timestamp');
    await queryRunner.dropForeignKey('user_activity_logs', 'fk_user_activity_logs_user_id');
    await queryRunner.dropTable('user_activity_logs');
  }
}
