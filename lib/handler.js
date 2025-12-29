import menu from "./menu.js"
import config from "../config.js"

export default async function handler(sock, msg) {
  const text =
    msg.message?.conversation ||
    msg.message?.extendedTextMessage?.text ||
    ""

  if (!text.startsWith(config.prefix)) return

  const command = text.slice(1).trim().toLowerCase()

  switch (command) {
    case "menu":
      await sock.sendMessage(msg.key.remoteJid, menu(msg))
      break

    case "ping":
      await sock.sendMessage(msg.key.remoteJid, {
        text: "🏓 Pong gacor!"
      })
      break
  }
}
