export default {
  command: ["pay"],
  category: "Payment",
  desc: "Bayar via QRIS",

  run: async ({ sock, msg }) => {
    sock.sendMessage(msg.key.remoteJid,{
      text:
`💸 *PREMIUM NAVADEL-v30*
Harga: 10K

Scan QRIS:
https://link-qris-lu.com

⚡ Premium aktif otomatis setelah bayar`
    })
  }
}
