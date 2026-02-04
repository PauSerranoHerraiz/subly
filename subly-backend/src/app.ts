import "dotenv/config";
import express, { Application } from "express";
import configMiddleware from "./config";
import indexRoutes from "./routes/index.routes";
import authRoutes from "./routes/auth.routes";
import customersRoutes from "./routes/customers.routes";
import plansRoutes from "./routes/plans.routes";
import subscriptionsRoutes from "./routes/subscriptions.routes";
import errorHandling from "./error-handling";

const app: Application = express();
app.use (express.json())

configMiddleware(app);

app.use("/api", indexRoutes);
app.use("/auth", authRoutes);
app.use("/customers", customersRoutes);
app.use("/plans", plansRoutes);
app.use("/subscriptions", subscriptionsRoutes);

errorHandling(app)

export default app;

