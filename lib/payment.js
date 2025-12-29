import fs from "fs"
import path from "path"

const pendingFile = path.resolve("payment/pending.json")
const historyFile = path.resolve("payment/history.json")

if (!fs.existsSync(pendingFile)) fs.writeFileSync(pendingFile, "[]")
if (!fs.existsSync(historyFile)) fs.writeFileSync(historyFile, "[]")

export function addPending(data) {
  const list = JSON.parse(fs.readFileSync(pendingFile))
  list.push(data)
  fs.writeFileSync(pendingFile, JSON.stringify(list, null, 2))
}

export function getPending() {
  return JSON.parse(fs.readFileSync(pendingFile))
}

export function confirmPayment(user) {
  const pending = getPending()
  const target = pending.find(p => p.user === user)
  if (!target) return false

  const history = JSON.parse(fs.readFileSync(historyFile))
  history.push(target)

  fs.writeFileSync(historyFile, JSON.stringify(history, null, 2))
  fs.writeFileSync(
    pendingFile,
    JSON.stringify(pending.filter(p => p.user !== user), null, 2)
  )

  return true
}
