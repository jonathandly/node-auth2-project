const axios = require("axios");

const { authenticate } = require("../auth/authenticate");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/secrets");

const Users = require("../database/users-model");

module.exports = (server) => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/users", authenticate, getUsers);
};

function register(req, res) {
  // implement user registration
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 16);
  user.password = hash;

  Users.add(user)
    .then((save) => {
      res.status(201).json(save);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

function login(req, res) {
  // implement user login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res
          .status(200)
          .json({ message: `Welcome ${user.username}`, token: token });
      } else {
        res.status(401).json({ message: `You shall not pass!` });
      }
    })
    .catch((err) => res.status(500).json(err));
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}

function getUsers(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" },
  };

  axios
    .get("localhost:3300/api/users", requestOptions)
    .then((response) => {
      res.status(200).json(response.data.results);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error Fetching Users!!", error: err });
    });
}
