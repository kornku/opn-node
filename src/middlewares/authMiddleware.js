const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  if (token !== "faketoken_user1") {
    return res.sendStatus(403);
  }
  next();
};

module.exports =  authenticateToken
