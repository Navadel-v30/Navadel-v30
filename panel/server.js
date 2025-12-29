import express from "express"

const app = express()
app.get("/",(_,res)=>res.send("Navadel Panel Online"))
app.listen(8080)
