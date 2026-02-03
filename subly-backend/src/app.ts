import "dotenv/config";
import express, { Application } from "express";
import configMiddleware from "./config";
import indexRoutes from "./routes/index.routes";
import authRoutes from "./routes/auth.routes";
import errorHandling from "./error-handling";

const app: Application = express();

// Middleware configuration
configMiddleware(app);

// Routes
app.use("/api", indexRoutes);
app.use("/auth", authRoutes);

// Error handling
errorHandling(app);

export default app;