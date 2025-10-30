import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import companyRoutes from './routes/companyRoutes.js'
const app = express();
app.use(cors());
app.post("/webhooks", express.raw({ type: "application/json" }), clerkWebhooks);
app.use('/api/company',companyRoutes)
app.use(express.json());
app.get("/", (req, res) => res.send("API working ✅"));
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
