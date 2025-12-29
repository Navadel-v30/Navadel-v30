import config from "../config.js"
import { genKey } from "../lib/license.js"

export default {
  command: ["genkey"],
  category: "Owner",
  desc: "Generate license key",

  run: async ({ sock, msg }) => {
    const sender = msg.key.participant.split("@")[0]
    if (!config.owner.includes(sender)) {
      return sock.sendMessage(msg.key.remoteJid,{ text:"❌ Owner only" })
    }

    const key = genKey()
    sock.sendMessage(msg.key.remoteJid,{
      text:`🔑 LICENSE KEY\n${key}`
    })
  }
}
