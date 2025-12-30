// lib/handler.js
export default async function handler(sock, msg) {
  if (!msg?.message) return

  const jid = msg.key.remoteJid

  // contoh reply simple
  await sock.sendMessage(jid, {
    text: "Halo, bot aktif 😎🤙"
  })
}
