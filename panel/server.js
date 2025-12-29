import express from "express"
import bodyParser from "body-parser"
import routes from "./routes.js"

const app = express()
app.use(bodyParser.json())

routes(app)

app.use(express.static("panel/views"))

app.listen(3000, ()=>{
  console.log("🌐 Panel jalan di http://localhost:3000")
})
