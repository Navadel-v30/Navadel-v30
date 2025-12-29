import { isPremium } from "../lib/marketplace.js"

export default {
  command: ["yt","tt","ig"],
  category: "Downloader",
  desc: "Downloader video",
  premium: true,

  run: async ({ sock, msg, args }) => {
    const user = msg.key.participant
    if (!isPremium(user)) {
      return sock.sendMessage(msg.key.remoteJid,{
        text:"💎 Fitur PREMIUM\nHubungi owner untuk unlock"
      })
    }

    sock.sendMessage(msg.key.remoteJid,{
      text:"📥 Downloader aktif (demo)"
    })
  }
}
