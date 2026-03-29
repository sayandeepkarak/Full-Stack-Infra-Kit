import express from "express";
import allRoutes from "./app/routes/index.js";
import logger from "./app/middlewares/logger.js";
import errorHandler from "./app/middlewares/errorHandler.js";
import { applySecurity } from "./app/middlewares/security.js";
import { successResponse } from "./app/utils/response.js";
import StatusService from "./app/services/status.js";

const app = express();

applySecurity(app);

app.use(logger);
app.get("/health", (_, res) =>
  successResponse(res, StatusService.OK("Server is fine!")),
);
app.use("/api", allRoutes);
app.use(errorHandler);

export default app;
