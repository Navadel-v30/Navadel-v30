import fs from "fs"
import path from "path"

const file = path.resolve("database/users.json")
if (!fs.existsSync(file)) fs.writeFileSync(file, "{}")

function load() {
  return JSON.parse(fs.readFileSync(file))
}

function save(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2))
}

export function getUser(user) {
  const data = load()
  if (!data[user]) {
    data[user] = {
      point: 0,
      win: 0,
      lose: 0,
      level: 1
    }
    save(data)
  }
  return data[user]
}

export function addWin(user, point = 10) {
  const data = load()
  const u = data[user] || getUser(user)

  u.win++
  u.point += point
  u.level = Math.floor(u.point / 100) + 1

  data[user] = u
  save(data)
}

export function addLose(user) {
  const data = load()
  const u = data[user] || getUser(user)

  u.lose++
  data[user] = u
  save(data)
}

export function leaderboard() {
  const data = load()
  return Object.entries(data)
    .sort((a,b)=>b[1].point - a[1].point)
    .slice(0,10)
}
