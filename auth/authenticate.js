const jwt = require("jsonwebtoken");

const secret = require("../config/secrets");

module.exports = {
  authenticate,
};

function authenticate(req, res, next) {
  const token = req.get("Authorization");

  if (token) {
    jwt.verify(token, secret.jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json(err);

        req.decoded = decoded;

        next();
      }
    });
  } else {
    return res.status(401).json({
      error: "No token provided, must be set on the Authorization header!",
    });
  }
}
