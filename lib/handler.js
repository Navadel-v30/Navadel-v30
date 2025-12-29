import fs from "fs"
import config from "../config.js"
import antiSpam from "./spam.js"
import addStat from "./database.js"

const plugins = []
for (const file of fs.readdirSync("./plugins")) {
  if (file.endsWith(".js")) {
    plugins.push(await import(`../plugins/${file}`))
  }
}

export default async function handler(sock, msg) {
  const text =
    msg.message?.conversation ||
    msg.message?.extendedTextMessage?.text ||
    ""

  if (!text.startsWith(config.prefix)) return

  const sender = msg.key.participant || msg.key.remoteJid
  if (config.antiSpam && antiSpam(sender)) return

  const [cmd, ...args] = text.slice(1).trim().split(" ")
  addStat(sender)

  for (const plugin of plugins) {
    if (plugin.default.command.includes(cmd)) {
      return plugin.default.run({ sock, msg, args })
    }
  }
}
