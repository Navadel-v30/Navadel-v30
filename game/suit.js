const sessions = {}
const items = ["batu","gunting","kertas"]

export function playSuit(user, pick) {
  if (!items.includes(pick)) return null

  const bot = items[Math.floor(Math.random() * 3)]

  if (pick === bot) return { result:"DRAW", bot }

  const win =
    (pick === "batu" && bot === "gunting") ||
    (pick === "gunting" && bot === "kertas") ||
    (pick === "kertas" && bot === "batu")

  return {
    result: win ? "WIN" : "LOSE",
    bot
  }
}
