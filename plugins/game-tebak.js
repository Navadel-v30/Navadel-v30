const number = Math.floor(Math.random() * 10) + 1

export default {
  command: ["tebak"],
  run: async ({ sock, msg }) => {
    const guess = parseInt(msg.message.conversation.split(" ")[1])
    if (!guess) return sock.sendMessage(msg.key.remoteJid,{ text:"Pilih angka 1-10"})

    sock.sendMessage(msg.key.remoteJid,{
      text: guess === number ? "🎉 BENAR!" : "❌ SALAH!"
    })
  }
}
