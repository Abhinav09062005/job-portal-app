import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

const app = express();

connectDB();

app.use(cors());

app.post("/webhooks", express.raw({ type: "*/*" }), clerkWebhooks);


app.use(express.json());

app.get("/", (req, res) => {
  res.send("API working ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
