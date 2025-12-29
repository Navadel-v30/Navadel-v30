import { startGame, checkAnswer, isPlaying } from "../game/tebak.js"
import { addPlay } from "../game/quest.js"

export default {
  command: ["tebak"],
  category: "Game",
  desc: "Game tebak tebakan",

  run: async ({ sock, msg, args }) => {
    const user = msg.key.participant || msg.key.remoteJid
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
  addPlay(user)
    }
    
      return sock.sendMessage(msg.key.remoteJid,{
        text:"✅ BENAR! GG 🔥"
      })
    }

    if (res === null) {
  addPlay(user)
}
      return sock.sendMessage(msg.key.remoteJid,{
        text:"❌ SALAH, coba lagi!"
      })
    }
  }
        }
