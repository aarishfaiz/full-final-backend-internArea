const express = require("express");
const router = express.Router();

const adminUsername = "aarish";
const adminPassword = "aarish";

router.post("/adminlogin", async (req, res) => {
  const { username,  password } = req.body;

  if (username === adminUsername || password === adminPassword) {
    res.send("Admin is Here");
    console.log("Admin is Logged in")
  } else {
    res.status(401).send("Unauthorized ");
    console.log("Admin Not Authorized")
  }
});

module.exports = router;
