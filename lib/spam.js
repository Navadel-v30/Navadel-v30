const cooldown = {}

export default function antiSpam(id) {
  const now = Date.now()
  if (cooldown[id] && now - cooldown[id] < 3000) return true
  cooldown[id] = now
  return false
}
