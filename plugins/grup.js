export default {
  command: ["welcome","antilink"],
  category: "Group",
  desc: "Group management",

  run: async ({ sock, msg, args }) => {
    if (!msg.key.remoteJid.endsWith("@g.us")) {
      return sock.sendMessage(msg.key.remoteJid,{ text:"❌ Group only" })
    }

    sock.sendMessage(msg.key.remoteJid,{
      text:"👥 Fitur group aktif (demo)"
    })
  }
}
