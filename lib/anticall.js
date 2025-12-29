export default async function antiCall(sock) {
  sock.ev.on("call", async (call) => {
    await sock.rejectCall(call[0].id, call[0].from)
  })
}
