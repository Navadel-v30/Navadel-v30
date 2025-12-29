import express from "express"
import bodyParser from "body-parser"
import webhook from "./webhook.js"

const app = express()
app.use(bodyParser.json())

app.post("/callback/payment", webhook)

app.listen(8080, () => {
  console.log("🚀 Webhook aktif di port 8080")
})
