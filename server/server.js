import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks.js";

const app = express();

app.use(cors());

// ✅ Raw body must be used for webhooks BEFORE JSON parsing
app.use("/webhooks", express.raw({ type: "*/*" }));

// Normal JSON parsing for all other routes
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ API working");
});

app.post("/webhooks", clerkWebhooks);

// DB Connect
connectDB()
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Connection Failed:", err));

// ✅ Production & Local Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
