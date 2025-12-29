const suit = ["batu","gunting","kertas"]

export default {
  command: ["suit"],
  run: async ({ sock, msg, args }) => {
    const user = args[0]
    if (!suit.includes(user))
      return sock.sendMessage(msg.key.remoteJid,{ text:"batu / gunting / kertas"})

    const bot = suit[Math.floor(Math.random()*3)]
    sock.sendMessage(msg.key.remoteJid,{
      text:`🧠 Bot: ${bot}\n👤 Kamu: ${user}`
    })
  }
}
