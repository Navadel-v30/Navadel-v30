import config from "../config.js"

export default {
  command: ["restart"],
  run: async ({ sock, msg }) => {
    if (!config.owner.includes(msg.key.participant.split("@")[0]))
      return sock.sendMessage(msg.key.remoteJid,{ text:"❌ Owner only"})

    sock.sendMessage(msg.key.remoteJid,{ text:"♻️ Restarting..."})
    process.exit()
  }
}
