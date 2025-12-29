import { startAngka, checkAngka } from "../game/angka.js"

export default {
  command: ["angka"],
  category: "Game",
  desc: "Game tebak angka",

  run: async ({ sock, msg, args }) => {
    const user = msg.key.participant

    if (!args[0]) {
      const ok = startAngka(user)
      if (!ok) {
        return sock.sendMessage(msg.key.remoteJid,{
          text:"🎯 Game masih berjalan!"
        })
      }

      return sock.sendMessage(msg.key.remoteJid,{
        text:"🎯 *TEBAK ANGKA*\nPilih angka 1–10\nKesempatan: 3"
      })
    }

    const res = checkAngka(user, args[0])
    if (res === "WIN") {
      return sock.sendMessage(msg.key.remoteJid,{ text:"✅ BENAR! GG 🔥" })
    }

    if (typeof res === "string" && res.startsWith("LOSE")) {
      return sock.sendMessage(msg.key.remoteJid,{
        text:`❌ KALAH\nJawaban: ${res.split(":")[1]}`
      })
    }

    if (typeof res === "string" && res.startsWith("TRY")) {
      return sock.sendMessage(msg.key.remoteJid,{
        text:`❌ SALAH\nSisa: ${res.split(":")[1]}`
      })
    }
  }
                              }
