const express = require("express");
const paginate = require("./middleware/pagination");
const User = require("./models/user.model");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/user", paginate(User), async (req, res) => {
  try {
    return res.status(200).json(res.pagination);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = app;
