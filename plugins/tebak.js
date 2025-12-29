import { startGame, checkAnswer, isPlaying } from "../game/tebak.js"

export default {
  command: ["tebak"],
  category: "Game",
  desc: "Game tebak tebakan",

  run: async ({ sock, msg, args }) => {
    const user = msg.key.participant
    const text = args.join(" ")

    if (!text) {
      const soal = startGame(user)
      if (!soal) {
        return sock.sendMessage(msg.key.remoteJid,{
          text:"🎮 Kamu masih main!\nJawab dulu."
        })
      }

      return sock.sendMessage(msg.key.remoteJid,{
        text:`🎮 *TEBAK TEBAKAN*\n\n${soal}\n\n⏳ 60 detik`
      })
    }

    if (!isPlaying(user)) return

    const res = checkAnswer(user, text)
    if (res === true) {
      return sock.sendMessage(msg.key.remoteJid,{
        text:"✅ BENAR! GG 🔥"
      })
    }

    if (res === null) {
      return sock.sendMessage(msg.key.remoteJid,{
        text:"❌ SALAH, coba lagi!"
      })
    }
  }
        }
