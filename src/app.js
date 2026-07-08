import env from "./config/env.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import router from "./routes/index.js";

import notFoundMiddleware from "./middleware/notFound.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

/**
 * Security
 */
app.use(helmet());

app.use(
  cors({
    origin: [env.CLIENT_URL, env.ADMIN_URL],
    credentials: true,
  }),
);

/**
 * Parsers
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

/**
 * Routes
 */
app.use("/api/v1", router);

/**
 * 404 Middleware
 */
app.use(notFoundMiddleware);

/**
 * Global Error Middleware
 */
app.use(errorMiddleware);

export default app;
