export const ADMIN = {
  username: "admin",
  password: "navadel123"
}

export function auth(req, res, next) {
  if (req.headers.authorization === "Bearer navadel-panel") {
    next()
  } else {
    res.status(401).send("Unauthorized")
  }
}
