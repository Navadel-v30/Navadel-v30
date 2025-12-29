import {
  makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} from "@whiskeysockets/baileys"
import Pino from "pino"
import chalk from "chalk"
import config from "../config.js"
import handler from "./handler.js"

export default async function startConnection() {
  const { state, saveCreds } = await useMultiFileAuthState("./session")

  const sock = makeWASocket({
    logger: Pino({ level: "silent" }),
    auth: state,
    printQRInTerminal: false
  })

  if (!sock.authState.creds.registered) {
    const code = await sock.requestPairingCode(config.pairingNumber)
    console.log(chalk.green(`\nPAIRING CODE : ${code}\n`))
  }

  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
    if (connection === "open") {
      console.log(chalk.cyan("✅ BOT CONNECTED"))
    }
    if (connection === "close") {
      startConnection()
    }
  })

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message) return
    handler(sock, msg)
  })
                                               }
