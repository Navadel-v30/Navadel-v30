const sessions = {}

export function startAngka(user) {
  if (sessions[user]) return null

  const number = Math.floor(Math.random() * 10) + 1

  sessions[user] = {
    number,
    chance: 3,
    timeout: setTimeout(() => delete sessions[user], 60000)
  }

  return true
}

export function checkAngka(user, guess) {
  const s = sessions[user]
  if (!s) return false

  s.chance--

  if (parseInt(guess) === s.number) {
    clearTimeout(s.timeout)
    delete sessions[user]
    return "WIN"
  }

  if (s.chance <= 0) {
    const ans = s.number
    clearTimeout(s.timeout)
    delete sessions[user]
    return `LOSE:${ans}`
  }

  return `TRY:${s.chance}`
    }
