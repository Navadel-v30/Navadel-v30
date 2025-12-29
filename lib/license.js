import fs from "fs"
import path from "path"
import crypto from "crypto"

const keyFile = path.resolve("license/keys.json")
const claimFile = path.resolve("license/claimed.json")

if (!fs.existsSync(keyFile)) fs.writeFileSync(keyFile, "[]")
if (!fs.existsSync(claimFile)) fs.writeFileSync(claimFile, "[]")

export function genKey() {
  const key = crypto.randomBytes(8).toString("hex").toUpperCase()
  const keys = JSON.parse(fs.readFileSync(keyFile))
  keys.push(key)
  fs.writeFileSync(keyFile, JSON.stringify(keys,null,2))
  return key
}

export function claimKey(key, user) {
  const keys = JSON.parse(fs.readFileSync(keyFile))
  const claimed = JSON.parse(fs.readFileSync(claimFile))

  if (!keys.includes(key)) return false
  if (claimed.find(c => c.user === user)) return "USED"

  claimed.push({ key, user, time: Date.now() })

  fs.writeFileSync(
    keyFile,
    JSON.stringify(keys.filter(k => k !== key), null, 2)
  )
  fs.writeFileSync(claimFile, JSON.stringify(claimed,null,2))

  return true
}
