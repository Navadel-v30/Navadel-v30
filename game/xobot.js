export function botMove(board) {
  const empty = board.map((v,i)=>v?null:i).filter(v=>v!==null)
  return empty[Math.floor(Math.random()*empty.length)]
}
