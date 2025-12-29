import fs from "fs"

const db = "./database/premium.json"
if (!fs.existsSync(db)) fs.writeFileSync(db, "{}")

export default {
  command: ["premium"],
  category: "User",
  desc: "Cek status premium",

  run: async ({ sock, msg }) => {
    const data = JSON.parse(fs.readFileSync(db))
    const user = msg.key.participant

    sock.sendMessage(msg.key.remoteJid,{
      text: data[user]
        ? "💎 Kamu PREMIUM"
        : "❌ Kamu FREE user"
    })
  }
}
