import fetch from "node-fetch"
import config from "../config.js"

export default {
  command: ["ai"],
  category: "AI",
  desc: "Chat AI pintar",

  run: async ({ sock, msg, args }) => {
    if (!args[0]) {
      return sock.sendMessage(msg.key.remoteJid,{ text:"🤖 Tulis pertanyaan" })
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions",{
      method:"POST",
      headers:{
        "Authorization":`Bearer ${config.aiApiKey}`,
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        model:"gpt-4o-mini",
        messages:[{ role:"user", content: args.join(" ") }]
      })
    })

    const json = await res.json()
    const reply = json.choices?.[0]?.message?.content || "AI error"

    sock.sendMessage(msg.key.remoteJid,{ text: reply })
  }
}
