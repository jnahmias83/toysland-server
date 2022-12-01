const jwt = require("jsonwebtoken");

const generateToken = (payload, privateKey, options) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
};

const verifyToken = (token, privateKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, privateKey, (err, dataFromToken) => {
      if (err) reject(err);
      else resolve(dataFromToken);
    });
  });
};

module.exports = {
  generateToken,
  verifyToken,
};
