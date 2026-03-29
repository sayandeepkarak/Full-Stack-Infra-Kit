import { primarySql, replicaSql } from "../../db/sql.js";

class TodoService {
  async addTodo(title, description = null) {
    await primarySql`INSERT INTO todos (title, description) VALUES (${title}, ${description ?? null})`;
  }

  async getAllTodos() {
    return await replicaSql`SELECT * FROM todos`;
  }

  async getTodoById(id) {
    return await replicaSql`SELECT * FROM todos WHERE id = ${id}`;
  }

  async searchTodos(title) {
    return await replicaSql`SELECT * FROM todos WHERE title LIKE ${`%${title}%`}`;
  }

  async updateTodo(id, payload) {
    const updates = {};
    Object.keys(payload).forEach((key) => {
      if (payload[key] !== undefined) updates[key] = payload[key];
    });
    await primarySql`UPDATE todos SET ${primarySql(updates)} WHERE id = ${id}`;
  }

  async deleteTodo(id) {
    await primarySql`DELETE FROM todos WHERE id = ${id}`;
  }
}

const todoService = new TodoService();

export default todoService;
