import { createRoom, play, endRoom, render } from "../game/tiktakto.js"
import { addPlay } from "../game/quest.js"

export default {
  command: ["xo","tiktakto"],
  category: "Game",
  desc: "Game TicTacToe 1v1",

  run: async ({ sock, msg, args }) => {
    const jid = msg.key.remoteJid
    const user = msg.key.participant || jid
    const roomId = jid

    // start
    if (args[0] === "start") {
      const target = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
      if (!target) return sock.sendMessage(jid,{ text:"Tag lawan!" })

      const room = createRoom(roomId, user, target)
      if (!room) return sock.sendMessage(jid,{ text:"Room sudah ada!" })

      return sock.sendMessage(jid,{
        text:
`🎮 *TIKTAKTO*
X: @${user.split("@")[0]}
O: @${target.split("@")[0]}

${render(room.board)}
Giliran X`,
        mentions:[user,target]
      })
    }

    // play
    const pos = parseInt(args[0])
    if (isNaN(pos) || pos < 1 || pos > 9) return

    const res = play(roomId, user, pos-1)
    if (res.error) return sock.sendMessage(jid,{ text:"❌ Gak bisa!" })

    let text = `🎮 *TIKTAKTO*\n${render(res.board)}`

    if (res.win) {
      if (res.win === "DRAW") {
        text += "\n🤝 SERI!"
      } else {
        text += `\n🏆 ${res.win} MENANG!`
        addPlay(user)
      }
      endRoom(roomId)
    }

    sock.sendMessage(jid,{ text })
  }
}
