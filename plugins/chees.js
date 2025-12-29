import { startChess, moveChess } from "../game/chess.js"

export default {
  command: ["chess"],
  category: "Game",

  run: async ({ sock, msg, args }) => {
    const jid = msg.key.remoteJid
    const user = msg.key.participant || jid

    if (args[0] === "start") {
      const enemy = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
      if (!enemy) return sock.sendMessage(jid,{ text:"Tag lawan!" })

      startChess(jid, user, enemy)
      return sock.sendMessage(jid,{ text:"♟️ Chess dimulai! White jalan dulu." })
    }

    const res = moveChess(jid, user, args[0])
    if (res?.error) return sock.sendMessage(jid,{ text:"❌ Gak bisa!" })

    sock.sendMessage(jid,{ text:`♟️ Move: ${args[0]}` })
  }
}
