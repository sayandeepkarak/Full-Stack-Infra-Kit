import { Router } from "express";
import todoRoutes from "./todo.routes.js";

const allRoutes = Router();

allRoutes.use("/todo", todoRoutes);

export default allRoutes;
