import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from "./config/cloudinary.js";
const app = express();
app.use(express.json());
app.use(cors());
app.post("/webhooks", express.raw({ type: "application/json" }), clerkWebhooks);
app.use('/api/company',companyRoutes)
app.use(express.json());
app.get("/", (req, res) => res.send("API working ✅"));
connectDB();
await connectCloudinary()
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
