import config from "../config.js"

export default {
  command: ["restart"],
  run: async ({ sock, msg }) => {
    const sender = msg.key.participant.split("@")[0]
    if (!config.owner.includes(sender))
      return sock.sendMessage(msg.key.remoteJid,{ text:"❌ Owner only"})

    await sock.sendMessage(msg.key.remoteJid,{ text:"♻️ Restart..."})
    process.exit()
  }
}
