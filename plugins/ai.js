export default {
  command: ["ai"],
  run: async ({ sock, msg }) => {
    const q = msg.message.conversation.split(" ").slice(1).join(" ")
    if (!q) return sock.sendMessage(msg.key.remoteJid,{ text:"❓ Tanya apa?"})

    sock.sendMessage(msg.key.remoteJid,{
      text: `🤖 AI Reply:\n"${q}"\n\n(versi simple, siap ganti API)`
    })
  }
}
