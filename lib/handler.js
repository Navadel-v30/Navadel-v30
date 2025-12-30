export async function handler(sock, msg) {
  if (!msg?.message) return

  const jid = msg.key.remoteJid

  await sock.sendMessage(jid, {
    text: "Halo, bot aktif 😎🤙"
  })
}
