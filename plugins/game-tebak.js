export default {
  command: ["tebak"],
  category: "Game",
  desc: "Game tebak angka 1-10",

  run: async ({ sock, msg, args }) => {
    const n = parseInt(args[0])
    if (!n) {
      return sock.sendMessage(msg.key.remoteJid,{ text:"🎮 Tebak angka 1-10" })
    }

    const benar = Math.floor(Math.random()*10)+1
    sock.sendMessage(msg.key.remoteJid,{
      text: n === benar ? "🎉 BENAR!" : `❌ SALAH! Jawaban: ${benar}`
    })
  }
}
