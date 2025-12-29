export default {
  command: ["yt","tt","ig"],
  run: async ({ sock, msg, command }) => {
    sock.sendMessage(msg.key.remoteJid,{
      text:`📥 ${command.toUpperCase()} Downloader\n(Fitur siap, tinggal pasang API)`
    })
  }
}
