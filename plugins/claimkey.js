import { claimKey } from "../lib/license.js"
import { addPremium } from "../lib/marketplace.js"

export default {
  command: ["claimkey"],
  category: "License",
  desc: "Aktifkan license",

  run: async ({ sock, msg, args }) => {
    if (!args[0]) {
      return sock.sendMessage(msg.key.remoteJid,{
        text:"Contoh: .claimkey XXXXXXXX"
      })
    }

    const user = msg.key.participant
    const res = claimKey(args[0], user)

    if (res === true) {
      addPremium(user)
      return sock.sendMessage(msg.key.remoteJid,{
        text:"✅ LICENSE AKTIF\n💎 PREMIUM TERBUKA"
      })
    }

    if (res === "USED") {
      return sock.sendMessage(msg.key.remoteJid,{
        text:"❌ Nomor ini sudah klaim license"
      })
    }

    sock.sendMessage(msg.key.remoteJid,{
      text:"❌ License tidak valid"
    })
  }
}
