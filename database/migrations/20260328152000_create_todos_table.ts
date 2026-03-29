import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("todos", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.string("title", 255).notNullable();
    table.string("description", 300).nullable();
    table
      .timestamp("created_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp("updated_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
  });

  await knex.raw(`
    ALTER TABLE todos
    ADD CONSTRAINT chk_todos_description_min_length
    CHECK (description IS NULL OR length(description) >= 10)
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("todos");
}
