import { getMarket } from "../lib/marketplace.js"

export default {
  command: ["market"],
  category: "Info",
  desc: "List plugin marketplace",

  run: async ({ sock, msg }) => {
    const data = getMarket()
    if (!data.length) {
      return sock.sendMessage(msg.key.remoteJid,{ text:"📦 Marketplace kosong" })
    }

    let text = "🧩 *PLUGIN MARKETPLACE*\n\n"
    for (const p of data) {
      text += `• ${p.name} — ${p.price}\n`
    }

    sock.sendMessage(msg.key.remoteJid,{ text })
  }
}
