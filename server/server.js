import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

const app = express();

// ✅ First connect to MongoDB (before routes are used)
connectDB();

// ✅ CORS
app.use(cors());

// RAW body for webhook
app.post("/webhooks", express.raw({ type: "*/*" }), clerkWebhooks);


// ✅ JSON Parser for every other API route
app.use(express.json());

// ✅ Example Route
app.get("/", (req, res) => {
  res.send("API working ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
