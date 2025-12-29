import {
  makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} from "@whiskeysockets/baileys"
import Pino from "pino"
import chalk from "chalk"
import readline from "readline"
import handler from "./handler.js"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function askNumber() {
  return new Promise(resolve => {
    rl.question("📱 Masukkan nomor WA (628xxxx): ", number => {
      resolve(number.trim())
    })
  })
}

export default async function startConnection() {
  const { state, saveCreds } = await useMultiFileAuthState("./session")

  const sock = makeWASocket({
    logger: Pino({ level: "silent" }),
    auth: state,
    printQRInTerminal: false
  })

  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("connection.update", async ({ connection, lastDisconnect }) => {
    if (connection === "open") {
      console.log(chalk.cyan("✅ BOT CONNECTED"))

      if (!sock.authState.creds.registered) {
        const number = await askNumber()

        setTimeout(async () => {
          try {
            const code = await sock.requestPairingCode(number)
            console.log(chalk.green(`\nPAIRING CODE : ${code}\n`))
          } catch (e) {
            console.log("❌ Gagal pairing:", e.message)
          }
        }, 2000)
      }
    }

    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode
      console.log("❌ DISCONNECTED:", reason)

      if (reason !== DisconnectReason.loggedOut) {
        startConnection()
      }
    }
  })

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0]
    if (!msg?.message) return
    handler(sock, msg)
  })
          }
