import { playSuit } from "../game/suit.js"

export default {
  command: ["suit"],
  category: "Game",
  desc: "Suit batu gunting kertas",

  run: async ({ sock, msg, args }) => {
    if (!args[0]) {
      return sock.sendMessage(msg.key.remoteJid,{
        text:"✊✌️✋\nContoh: .suit batu"
      })
    }

    const res = playSuit(msg.key.participant, args[0].toLowerCase())
    if (!res) {
      return sock.sendMessage(msg.key.remoteJid,{
        text:"Pilihan: batu / gunting / kertas"
      })
    }

    sock.sendMessage(msg.key.remoteJid,{
      text:`🤖 Bot: ${res.bot}\n🎮 Kamu: ${args[0]}\n\n${res.result}`
    })
  }
}
