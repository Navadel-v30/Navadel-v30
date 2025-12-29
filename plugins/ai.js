import config from "../config.js"

export default {
  command: ["ai"],
  run: async ({ sock, msg, args }) => {
    if (!args[0]) {
      return sock.sendMessage(msg.key.remoteJid,{ text:"🤖 Tulis pertanyaan"})
    }

    // placeholder (ganti API bebas)
    sock.sendMessage(msg.key.remoteJid,{
      text:`🤖 AI Reply:\n${args.join(" ")}`
    })
  }
}
