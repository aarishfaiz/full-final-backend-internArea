const express = require("express");
const router = express.Router();
const admin = require("./AdminRoute");
const ApplicationRoute = require("./ApplicationRoute")
const intern = require("./InternshipRoute");
const job = require("./JobRoute");


router.get("/api", (req, res) => {
  res.send("This is Backend");
});

router.use("/admin", admin);
router.use("/internship", intern);
router.use("/job", job);
router.use("/application", ApplicationRoute)

module.exports = router;
