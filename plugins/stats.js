import fs from "fs"

const db = "./database/users.json"
if (!fs.existsSync(db)) fs.writeFileSync(db, "{}")

export default {
  command: ["stats"],
  run: async ({ sock, msg }) => {
    const data = JSON.parse(fs.readFileSync(db))
    const user = msg.key.participant
    data[user] = (data[user] || 0) + 1
    fs.writeFileSync(db, JSON.stringify(data,null,2))

    sock.sendMessage(msg.key.remoteJid,{
      text:`📊 Total command kamu: ${data[user]}`
    })
  }
}
