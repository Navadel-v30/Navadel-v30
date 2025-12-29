import fs from "fs"

export default function buildMenu() {
  const plugins = []
  for (const file of fs.readdirSync("./plugins")) {
    if (file.endsWith(".js")) {
      plugins.push(require(`../plugins/${file}`).default)
    }
  }

  const map = {}
  for (const p of plugins) {
    if (!map[p.category]) map[p.category] = []
    map[p.category].push(p)
  }

  let text = `🔥 *NAV ADEL V30 — 2025* 🔥\n\n`

  for (const cat in map) {
    text += `📌 *${cat.toUpperCase()}*\n`
    for (const p of map[cat]) {
      text += `• .${p.command[0]} — ${p.desc}\n`
    }
    text += "\n"
  }

  return text
}
