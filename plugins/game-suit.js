const suit = ["batu","gunting","kertas"]

export default {
  command: ["suit"],
  run: async ({ sock, msg }) => {
    const user = msg.message.conversation.split(" ")[1]
    if (!suit.includes(user))
      return sock.sendMessage(msg.key.remoteJid,{ text:"Pilih: batu / gunting / kertas"})

    const bot = suit[Math.floor(Math.random()*3)]
    sock.sendMessage(msg.key.remoteJid,{
      text:`🧠 Bot: ${bot}\n👤 Kamu: ${user}`
    })
  }
}
