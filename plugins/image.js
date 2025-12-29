export default {
  command: ["image","img","gambar"],
  category: "Main",

  run: async ({ sock, msg }) => {
    const jid = msg.key.remoteJid

    // LINK GAMBAR DARI GITHUB (RAW)
    const imageUrl = "https://raw.githubusercontent.com/USERNAME/REPO/main/image/menu.jpg"

    await sock.sendMessage(jid, {
      image: { url: imageUrl },
      caption: "🚀 Navadel-v30\nPowered by GitHub 😎🤙"
    })
  }
}
