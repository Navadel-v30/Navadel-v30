import { getQuest } from "../game/quest.js"

export default {
  command: ["quest"],
  category: "Game",
  desc: "Daily quest",

  run: async ({ sock, msg }) => {
    const q = getQuest(msg.key.participant)

    sock.sendMessage(msg.key.remoteJid,{
      text:
`📅 *DAILY QUEST*
Main game: ${q.play}/3
Status: ${q.done ? "✅ Selesai" : "⏳ Proses"}`
    })
  }
}
