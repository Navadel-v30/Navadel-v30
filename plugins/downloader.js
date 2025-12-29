export default {
  command: ["yt","tt","ig"],
  run: async ({ sock, msg, command }) => {
    sock.sendMessage(msg.key.remoteJid,{
      text:`📥 ${command.toUpperCase()} Downloader\nGunakan API eksternal`
    })
  }
}
