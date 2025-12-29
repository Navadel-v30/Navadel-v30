import { addPending } from "../lib/payment.js"

export default {
  command: ["pay","donate"],
  category: "Payment",
  desc: "Bayar premium",

  run: async ({ sock, msg }) => {
    const user = msg.key.participant

    addPending({
      user,
      time: Date.now(),
      status: "PENDING"
    })

    sock.sendMessage(msg.key.remoteJid,{
      text:
`💸 *PREMIUM NAVADEL-v30*

Harga: 10K
Metode:
• DANA: 08xxxxxxx
• QRIS: (kirim manual / gambar)

Setelah bayar:
Ketik *.confirm*

⏳ Status: PENDING`
    })
  }
}
