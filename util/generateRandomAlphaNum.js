const generateRandomAlphaNum = (strSize) => {
    return [...Array(strSize)]
      .map(() => Math.floor(Math.random() * 35).toString(35))
      .join("");
  };
  
module.exports = generateRandomAlphaNum;
  