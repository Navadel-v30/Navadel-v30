import config from "../config.js"
import { confirmPayment } from "../lib/payment.js"
import { addPremium } from "../lib/marketplace.js"

export default {
  command: ["confirm"],
  category: "Owner",
  desc: "Konfirmasi payment",

  run: async ({ sock, msg, args }) => {
    const sender = msg.key.participant.split("@")[0]
    if (!config.owner.includes(sender)) {
      return sock.sendMessage(msg.key.remoteJid,{ text:"❌ Owner only" })
    }

    if (!args[0]) {
      return sock.sendMessage(msg.key.remoteJid,{ text:"Contoh: .confirm 628xxx" })
    }

    const user = args[0] + "@s.whatsapp.net"
    const ok = confirmPayment(user)
    if (!ok) {
      return sock.sendMessage(msg.key.remoteJid,{ text:"❌ User tidak ada di pending" })
    }

    addPremium(user)

    sock.sendMessage(msg.key.remoteJid,{
      text:`✅ PAYMENT DITERIMA\n💎 ${args[0]} PREMIUM AKTIF`
    })
  }
}
