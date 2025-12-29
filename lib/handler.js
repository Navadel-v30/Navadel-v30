import buildMenu from "./menu.js"

if (cmd === "menu") {
  return sock.sendMessage(msg.key.remoteJid,{
    text: buildMenu()
  })
}
