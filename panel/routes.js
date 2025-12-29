import fs from "fs"
import path from "path"
import { auth } from "./auth.js"

const premiumFile = path.resolve("marketplace/premium.json")
const historyFile = path.resolve("payment/history.json")

export default function(app) {

  app.get("/api/users", auth, (req,res)=>{
    const data = JSON.parse(fs.readFileSync(premiumFile))
    res.json(data)
  })

  app.post("/api/premium/add", auth, (req,res)=>{
    const { user } = req.body
    const data = JSON.parse(fs.readFileSync(premiumFile))
    if (!data.includes(user)) data.push(user)
    fs.writeFileSync(premiumFile, JSON.stringify(data,null,2))
    res.json({ success:true })
  })

  app.post("/api/premium/remove", auth, (req,res)=>{
    const { user } = req.body
    const data = JSON.parse(fs.readFileSync(premiumFile))
    fs.writeFileSync(
      premiumFile,
      JSON.stringify(data.filter(u=>u!==user),null,2)
    )
    res.json({ success:true })
  })

  app.get("/api/payment", auth, (req,res)=>{
    const data = JSON.parse(fs.readFileSync(historyFile))
    res.json(data)
  })

}
