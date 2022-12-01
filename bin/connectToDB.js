const mongoose = require("mongoose");

module.exports = mongoose.connect(process.env.db_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
