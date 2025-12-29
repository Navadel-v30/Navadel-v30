import fetch from "node-fetch"

export default {
  command: ["yt","tt","ig"],
  category: "Downloader",
  desc: "Download video",

  run: async ({ sock, msg, args, command }) => {
    if (!args[0]) {
      return sock.sendMessage(msg.key.remoteJid,{
        text:`📥 Gunakan:\n.${command} <url>`
      })
    }

    // contoh API (ganti sesuai API pilihan lu)
    const api = `https://api.example.com/download?url=${args[0]}`
    const res = await fetch(api)
    const json = await res.json()

    sock.sendMessage(msg.key.remoteJid,{
      text:`✅ Download siap\n${json.result}`
    })
  }
}
