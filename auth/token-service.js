const jwt = require("jsonwebtoken");

const secrets = require("../api/secrets");

module.exports = {
  generateToken
};

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const secret = secrets.jwtSecret;

  const options = {
    expiresIn: "5d"
  };

  return jwt.sign(payload, secret, options);
}
