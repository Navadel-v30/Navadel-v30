const rooms = {}

export function createRoom(roomId, playerX, playerO) {
  if (rooms[roomId]) return null

  rooms[roomId] = {
    board: Array(9).fill(null),
    turn: playerX,
    players: { X: playerX, O: playerO }
  }

  return rooms[roomId]
}

export function play(roomId, user, pos) {
  const room = rooms[roomId]
  if (!room) return { error: "ROOM_NOT_FOUND" }
  if (room.turn !== user) return { error: "NOT_YOUR_TURN" }
  if (room.board[pos] !== null) return { error: "FILLED" }

  const symbol = room.players.X === user ? "X" : "O"
  room.board[pos] = symbol
  room.turn = room.players.X === user ? room.players.O : room.players.X

  return { board: room.board, win: checkWin(room.board), symbol }
}

export function endRoom(roomId) {
  delete rooms[roomId]
}

function checkWin(b) {
  const win = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ]
  for (let [a,b1,c] of win) {
    if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a]
  }
  return b.every(x => x) ? "DRAW" : null
}

export function render(board) {
  return board.map(x => x || "⬜")
    .reduce((a,b,i) => a + b + ((i+1)%3==0?"\n":""),"")
}
