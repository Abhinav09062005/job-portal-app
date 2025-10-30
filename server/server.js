import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node"
import { clerkWebhooks } from './controllers/webhooks.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send("API working"))
app.get("/debug-sentry", (req, res) => {
  throw new Error("My first Sentry error!")
})

app.post('/webhooks', clerkWebhooks)

// Connect DB
connectDB()
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB connection error:", err))

Sentry.setupExpressErrorHandler(app)

// Use this only locally (optional)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`)
  })
}

// Export for server hosting (Render needs it)
export default app
  