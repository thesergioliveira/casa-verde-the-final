const { sign } = require("jsonwebtoken");

const createToken = (user) => {
  const accessToken = sign(
    { username: user.username, id: user._id },
    process.env.TOKEN_TEXT,
    {
      // in seconds 600s = 10 min
      expiresIn: 300000,
    }
  );

  return accessToken;
};

module.exports = { createToken };
