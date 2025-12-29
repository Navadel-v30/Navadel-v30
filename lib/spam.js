const cooldown = {}

export default function antiSpam(user) {
  const now = Date.now()
  if (cooldown[user] && now - cooldown[user] < 3000) return true
  cooldown[user] = now
  return false
}
