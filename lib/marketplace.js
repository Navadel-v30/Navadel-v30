import fs from "fs"
import path from "path"

const file = path.resolve("marketplace/marketplace.json")

if (!fs.existsSync(file)) {
  fs.writeFileSync(file, "[]")
}

export function getPlugins() {
  return JSON.parse(fs.readFileSync(file))
}

export function addPlugin(plugin) {
  const data = getPlugins()
  data.push(plugin)
  fs.writeFileSync(file, JSON.stringify(data, null, 2))
}
