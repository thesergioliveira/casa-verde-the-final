const { sign } = require("jsonwebtoken");

const createToken = (user) => {
  const accessToken = sign(
    { username: user.username, password: user.password },
    process.env.TOKEN_TEXT,
    {
      // in seconds 600s = 10 min
<<<<<<< HEAD
      expiresIn: 300000,
=======
      expiresIn: 600,
>>>>>>> d3b32b2e922a040f37227de747afe95fc46fcd4b
    }
  );

  return accessToken;
};

module.exports = { createToken };
