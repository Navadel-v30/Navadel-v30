import { play, render } from "../game/tiktakto.js"
import { botMove } from "../game/xobot.js"

export default {
  command: ["xo"],
  category: "Game",

  run: async ({ sock, msg, args }) => {
    const jid = msg.key.remoteJid
    const user = msg.key.participant || jid

    // ===== STEP 1: ambil angka dari user =====
    const pos = parseInt(args[0])
    if (isNaN(pos) || pos < 1 || pos > 9) {
      return sock.sendMessage(jid,{
        text:
`🎮 *XO LAWAN BOT*
Ketik:
.xo 1 - 9

1 | 2 | 3
4 | 5 | 6
7 | 8 | 9`
      })
    }

    // ===== STEP 2: player jalan =====
    const res = play(jid, user, pos - 1)
    if (res.error) {
      return sock.sendMessage(jid,{ text:"❌ Kotak gak bisa!" })
    }

    // ===== STEP 3: bot jalan =====
    if (!res.win) {
      const botPos = botMove(res.board)
      if (botPos !== undefined) {
        res.board[botPos] = "O"
      }
    }

    // ===== STEP 4: kirim papan =====
    let text = `🎮 *XO LAWAN BOT*\n${render(res.board)}`

    if (res.win === "DRAW") text += "\n🤝 SERI!"
    if (res.win === "X") text += "\n🏆 KAMU MENANG!"
    if (res.win === "O") text += "\n💀 BOT MENANG!"

    sock.sendMessage(jid,{ text })
  }
  }
