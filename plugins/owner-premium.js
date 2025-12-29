import config from "../config.js"
import { addPremium } from "../lib/marketplace.js"

export default {
  command: ["addprem"],
  category: "Owner",
  desc: "Tambah user premium",

  run: async ({ sock, msg, args }) => {
    const sender = msg.key.participant.split("@")[0]
    if (!config.owner.includes(sender)) {
      return sock.sendMessage(msg.key.remoteJid,{ text:"❌ Owner only" })
    }

    if (!args[0]) {
      return sock.sendMessage(msg.key.remoteJid,{ text:"Contoh: .addprem 628xxx" })
    }

    addPremium(args[0] + "@s.whatsapp.net")
    sock.sendMessage(msg.key.remoteJid,{
      text:`✅ User ${args[0]} jadi PREMIUM`
    })
  }
}
