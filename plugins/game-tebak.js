let angka = Math.floor(Math.random()*10)+1

export default {
  command: ["tebak"],
  run: async ({ sock, msg, args }) => {
    const n = parseInt(args[0])
    if (!n) return sock.sendMessage(msg.key.remoteJid,{ text:"Pilih angka 1-10"})

    if (n === angka) {
      angka = Math.floor(Math.random()*10)+1
      return sock.sendMessage(msg.key.remoteJid,{ text:"🎉 BENAR!"})
    }
    sock.sendMessage(msg.key.remoteJid,{ text:"❌ SALAH"})
  }
}
