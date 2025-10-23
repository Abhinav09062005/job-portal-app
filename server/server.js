// api/server.js
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "../config/db.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "../controllers/webhooks.js";
import { createServer } from "@vercel/node";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0, // optional, for performance monitoring
});

// Routes
app.get("/", (req, res) => res.send("API working"));

// Debug Sentry route
app.get("/debug-sentry", (req, res) => {
  throw new Error("Test Sentry error!");
});

// Webhooks route
app.post("/webhooks", async (req, res, next) => {
  try {
    await clerkWebhooks(req, res); // your existing logic
  } catch (err) {
    next(err);
  }
});

// Global error handler (Sentry + generic)
app.use((err, req, res, next) => {
  console.error(err);
  Sentry.captureException(err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Ensure DB connection is initialized once per serverless instance
let dbConnected = false;
const ensureDBConnected = async () => {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
};

// Export as Vercel serverless function
export default createServer(async (req, res) => {
  try {
    await ensureDBConnected();
    app(req, res);
  } catch (err) {
    console.error(err);
    Sentry.captureException(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
