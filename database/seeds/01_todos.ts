import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("todos").del();
  await knex("todos").insert({
    title: "Buy groceries",
    description:
      "Pick up eggs, milk, bread, and fresh vegetables for the week.",
  });
}
