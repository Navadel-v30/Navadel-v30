const rooms = {}

export function startChess(room, white, black) {
  rooms[room] = {
    turn: "w",
    players: { w: white, b: black },
    moves: []
  }
  return rooms[room]
}

export function moveChess(room, user, move) {
  const r = rooms[room]
  if (!r) return { error: "NO_ROOM" }

  const color = r.players.w === user ? "w" : "b"
  if (r.turn !== color) return { error: "TURN" }

  r.moves.push(move)
  r.turn = r.turn === "w" ? "b" : "w"
  return r
}

export function endChess(room) {
  delete rooms[room]
}
