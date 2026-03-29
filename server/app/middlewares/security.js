import helmet from "helmet";
import cors from "cors";
import express from "express";

export function applySecurity(app) {
  app.disabled("x-powered-by");
  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(
    cors({
      origin: "*",
      credentials: true,
    }),
  );
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
}
