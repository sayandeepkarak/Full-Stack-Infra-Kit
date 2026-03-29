import { Router } from "express";
import { z } from "zod";
import todoService from "../services/todo/index.js";
import { successResponse } from "../utils/response.js";
import ZodValidator from "../services/zodValidator.js";
import StatusService from "../services/status.js";

const router = Router();

const createSchema = new ZodValidator({
  title: z
    .string()
    .min(1, "Title cannot be empty")
    .max(255, "Title is too long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(300, "Description must be at most 300 characters")
    .optional(),
});

const updateSchema = new ZodValidator({
  title: z
    .string()
    .min(1, "Title cannot be empty")
    .max(255, "Title is too long")
    .optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(300, "Description must be at most 300 characters")
    .optional(),
});

router.get("/", async (_, res) => {
  const todos = await todoService.getAllTodos();
  successResponse(res, StatusService.OK(todos));
});

router.get("/search", async (req, res) => {
  const { title } = req.query;
  const todos = await todoService.searchTodos(title);
  successResponse(res, StatusService.OK(todos));
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await todoService.getTodoById(id);
  if (!todo.length) {
    throw StatusService.NOT_FOUND("Todo not found");
  }
  successResponse(res, StatusService.OK(todo[0]));
});

router.post("/", async (req, res) => {
  const result = createSchema.validate(req.body);
  if (!result.status) {
    throw StatusService.BAD_REQUEST(result.error);
  }
  const { title, description } = result.data;
  await todoService.addTodo(title, description);
  successResponse(res, StatusService.OK("Todo Created Successfully"));
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const result = updateSchema.validate(req.body);
  if (!result.status) {
    throw StatusService.BAD_REQUEST(result.error);
  }
  await todoService.updateTodo(id, result.data);
  successResponse(res, StatusService.OK("Todo updated successfully"));
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await todoService.deleteTodo(id);
  successResponse(res, StatusService.OK("Todo deleted successfully"));
});

export default router;
