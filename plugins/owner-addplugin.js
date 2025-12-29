import { addPlugin } from "../lib/marketplace.js"

export default {
  command: ["addplugin"],
  category: "Owner",
  desc: "Tambah plugin ke marketplace",

  run: async ({ sock, msg }) => {
    addPlugin({
      name: "Downloader Pro",
      price: "PREMIUM",
      command: ".yt"
    })

    sock.sendMessage(msg.key.remoteJid,{
      text:"✅ Plugin berhasil disimpan"
    })
  }
}
