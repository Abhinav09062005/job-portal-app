import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // ✅ Verify raw body, not JSON body
const payloadString = req.body.toString();

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const event = whook.verify(payloadString, headers);
    const { data, type } = event;

    switch (type) {
      case "user.created":
        await User.create({
          _id: data.id,
          name: `${data.first_name} ${data.last_name}`,
          email: data.email_addresses[0].email_address,
          image: data.image_url,
          resume: "",
        });
        break;

      case "user.updated":
        await User.findByIdAndUpdate(data.id, {
          name: `${data.first_name} ${data.last_name}`,
          email: data.email_addresses[0].email_address,
          image: data.image_url,
        });
        break;

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;

      default:
        break;
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.log("❌ Webhook Error:", err.message);
    return res.status(400).json({ success: false, message: "Webhook verify failed" });
  }
};
