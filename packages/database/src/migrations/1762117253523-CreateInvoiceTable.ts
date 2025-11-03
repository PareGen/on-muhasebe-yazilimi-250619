import {
  type MigrationInterface,
  type QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class CreateInvoiceTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'invoices',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'client_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'amount',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'currency',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['pending', 'paid', 'cancelled'],
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
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'invoices',
      new TableForeignKey({
        name: 'fk_invoices_client_id',
        columnNames: ['client_id'],
        referencedTableName: 'clients',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'invoices',
      new TableIndex({
        name: 'idx_invoices_client_id',
        columnNames: ['client_id'],
      })
    );

    await queryRunner.createIndex(
      'invoices',
      new TableIndex({
        name: 'idx_invoices_client_id',
        columnNames: ['client_id'],
      })
    );

    await queryRunner.createIndex(
      'invoices',
      new TableIndex({
        name: 'idx_invoices_status',
        columnNames: ['status'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('invoices', 'idx_invoices_client_id');
    await queryRunner.dropIndex('invoices', 'idx_invoices_status');
    await queryRunner.dropForeignKey('invoices', 'fk_invoices_client_id');
    await queryRunner.dropTable('invoices');
  }
}
