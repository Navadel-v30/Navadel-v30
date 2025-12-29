import express from "express"
import fs from "fs"

const app = express()
const PORT = 3000

app.get("/", (req, res) => {
  const users = JSON.parse(fs.readFileSync("./database/users.json"))
  res.send(`
    <h1>Navadel-v30 Dashboard</h1>
    <p>Total Users: ${Object.keys(users).length}</p>
    <p>Total Commands: ${Object.values(users).reduce((a,b)=>a+b,0)}</p>
  `)
})

app.listen(PORT, () => {
  console.log("🌐 Dashboard running on port", PORT)
})
