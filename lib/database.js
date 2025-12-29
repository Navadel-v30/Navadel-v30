import fs from "fs"

const db = "./database/users.json"
if (!fs.existsSync(db)) fs.writeFileSync(db, "{}")

export default function addStat(user) {
  const data = JSON.parse(fs.readFileSync(db))
  data[user] = (data[user] || 0) + 1
  fs.writeFileSync(db, JSON.stringify(data, null, 2))
}
