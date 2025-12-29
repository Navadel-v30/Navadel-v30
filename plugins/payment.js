export default {
  command: ["pay","donate"],
  category: "Payment",
  desc: "Dukung bot via QRIS",

  run: async ({ sock, msg }) => {
    sock.sendMessage(msg.key.remoteJid,{
      text:`💸 *DONATE*

QRIS / DANA:
6283867677851

Terima kasih supportnya 🙏`
    })
  }
}
