import fs from "fs"
import path from "path"

const file = path.resolve("database/quest.json")
if (!fs.existsSync(file)) fs.writeFileSync(file, "{}")

function load() {
  return JSON.parse(fs.readFileSync(file))
}

function save(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2))
}

export function getQuest(user) {
  const data = load()
  const today = new Date().toDateString()

  if (!data[user] || data[user].date !== today) {
    data[user] = {
      date: today,
      play: 0,
      done: false
    }
    save(data)
  }

  return data[user]
}

export function addPlay(user) {
  const data = load()
  const q = getQuest(user)

  if (!q.done) {
    q.play++
    if (q.play >= 3) q.done = true
    data[user] = q
    save(data)
  }

  return q
}
