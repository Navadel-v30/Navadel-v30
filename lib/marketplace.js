import fs from "fs"
import path from "path"

const marketFile = path.resolve("marketplace/marketplace.json")
const premiumFile = path.resolve("marketplace/premium.json")

if (!fs.existsSync(marketFile)) fs.writeFileSync(marketFile, "[]")
if (!fs.existsSync(premiumFile)) fs.writeFileSync(premiumFile, "[]")

export function getMarket() {
  return JSON.parse(fs.readFileSync(marketFile))
}

export function addMarket(plugin) {
  const data = getMarket()
  data.push(plugin)
  fs.writeFileSync(marketFile, JSON.stringify(data, null, 2))
}

export function isPremium(user) {
  const data = JSON.parse(fs.readFileSync(premiumFile))
  return data.includes(user)
}

export function addPremium(user) {
  const data = JSON.parse(fs.readFileSync(premiumFile))
  if (!data.includes(user)) {
    data.push(user)
    fs.writeFileSync(premiumFile, JSON.stringify(data, null, 2))
  }
      }
