import fs from "fs"
import path from "path"
import config from "../config.js"
import antiSpam from "./spam.js"

const plugins = []
const pluginPath = "./plugins"

for (const file of fs.readdirSync(pluginPath)) {
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

  if (config.antiSpam && antiSpam(msg.key.participant)) return

  const command = text.slice(1).trim().toLowerCase()

  for (const plugin of plugins) {
    if (plugin.default.command.includes(command)) {
      return plugin.default.run({ sock, msg, command })
    }
  }
}
