const sessions = {}

export function startGame(user) {
  if (sessions[user]) return null

  const soal = [
    { q: "Apa yang naik tapi gak pernah turun?", a: "umur" },
    { q: "Punya gigi tapi gak bisa makan?", a: "sisir" },
    { q: "Apa yang makin diisi makin ringan?", a: "balon" }
  ]

  const pick = soal[Math.floor(Math.random() * soal.length)]

  sessions[user] = {
    answer: pick.a,
    timeout: setTimeout(() => {
      delete sessions[user]
    }, 60000)
  }

  return pick.q
}

export function checkAnswer(user, text) {
  if (!sessions[user]) return false

  if (text.toLowerCase() === sessions[user].answer) {
    clearTimeout(sessions[user].timeout)
    delete sessions[user]
    return true
  }

  return null
}

export function isPlaying(user) {
  return !!sessions[user]
}
