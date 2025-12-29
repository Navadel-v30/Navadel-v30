import config from "../config.js"

export default {
  command: ["restart","eval"],
  category: "Owner",
  desc: "Owner tools",

  run: async ({ sock, msg, args }) => {
    const sender = msg.key.participant.split("@")[0]
    if (!config.owner.includes(sender)) {
      return sock.sendMessage(msg.key.remoteJid,{ text:"❌ Owner only" })
    }

    if (args[0] === "restart") {
      await sock.sendMessage(msg.key.remoteJid,{ text:"♻️ Restarting..." })
      process.exit()
    }
  }
}
