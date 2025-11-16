import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import companyRoutes from "./routes/companyRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { clerkMiddleware } from "@clerk/express";

const app = express();

// 🔥 1. Webhooks FIRST → BEFORE json + Clerk middleware
app.post(
  "/webhooks",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

// 🔥 2. NOW load parsers + Clerk
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// 🔥 3. Routes
app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("API working ✅"));

connectDB();
await connectCloudinary();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
