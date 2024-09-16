const express = require("express");
const router = express.Router();
const Application = require("../Models/Application");

router.post("/", async (req, res) => {
  try {
    const applicationData = new Application({
      coverLetter: req.body.coverLetter,
      user: req.body.user,
      company: req.body.company,
      category: req.body.category,
      body: req.body.body,
      ApplicationId: req.body.ApplicationId,
    });

    const savedApplication = await applicationData.save();
    res.send(savedApplication);
  } catch (error) {
    console.error("Error while posting the data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Application.find();
    res.json(data).status(200);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Internal Server Error in getting the Applications" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Application.findById(id);
    if (!data) {
      res.status(404).json({ error: "Application is not  found" });
    }
    res.json(data).status(200);
  } catch (error) {
    console.log(error);
    res.send(404).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;
  let status; // Declare the state variable

  if (action === "accepted") {
    status = "accepted"; // Correct assignment syntax
  } else if (action === "rejected") {
    status = "rejected"; // Correct assignment syntax
  } else {
    return res.status(400).json({ error: "Invalid action" }); // Change status code to 400 for bad request
  }

  try {
    const updatedStatus = await Application.findByIdAndUpdate(
      id,
      { $set: { status: status } }, // Update the status field
      { new: true }
    );

    if (!updatedStatus) {
      return res
        .status(404)
        .json({ error: "Not able to update the Application" });
    }

    return res.status(200).json({ success: true, data: updatedStatus });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Not able to Update the User Status" });
  }
});

module.exports = router;
