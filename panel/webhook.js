import crypto from "crypto"
import { addPremium } from "../lib/marketplace.js"

const SECRET = "ISI_SECRET_DARI_GATEWAY"

export default function(req, res) {
  const signature = req.headers["x-callback-signature"]
  const payload = JSON.stringify(req.body)

  const hash = crypto
    .createHmac("sha256", SECRET)
    .update(payload)
    .digest("hex")

  if (hash !== signature) {
    return res.status(403).json({ message: "Invalid signature" })
  }

  const data = req.body

  if (data.status === "PAID") {
    const user = data.customer_phone + "@s.whatsapp.net"
    addPremium(user)
  }

  res.json({ success: true })
}
