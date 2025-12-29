import { addMarket } from "../lib/marketplace.js"

export default {
  command: ["addmarket"],
  category: "Owner",
  desc: "Tambah plugin ke marketplace",

  run: async ({ sock, msg }) => {
    addMarket({
      name: "Downloader Pro",
      price: "PREMIUM",
      command: ".yt"
    })

    sock.sendMessage(msg.key.remoteJid,{
      text:"✅ Plugin masuk marketplace"
    })
  }
}
