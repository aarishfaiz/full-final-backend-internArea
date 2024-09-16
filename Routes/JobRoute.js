const express = require("express");
const router = express.Router();
const Job = require("../Models/Job");
const jobd = require("../Data/JobData/JobData");

router.post("/", async (req, res) => {
  try {
    const jobs = jobd;
    const savedjobs = [];

    for (const jobData of jobs) {
      const newjob = new Job(jobData);
      const savedjob = await newjob.save();
      savedjobs.push(savedjob);
    }

    res.send(savedjobs);
  } catch (error) {
    console.error("Error while posting the data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/post", async (req, res) => {
  try {
    // Extracting data from request body
    const {
      company,
      category,
      title,
      aboutCompany,
      aboutJob,
      location,
      experience,
      whoCanApply,
      perks,
      AdditionalInformation,
      CTC,
      startDate,
    } = req.body;

    // Creating a new Job document
    const newJob = new Job({
      company,
      category,
      title,
      aboutCompany,
      aboutJob,
      location,
      experience,
      whoCanApply,
      perks,
      AdditionalInformation,
      CTC,
      startDate,
    });

    // Saving the job to the database
    await newJob.save();

    // Sending success response
    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    // Sending error response if something goes wrong
    console.error("Error creating job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/", async (req, res) => {
  try {
    const data = await Job.find();
    res.json(data).status(200);
  } catch (error) {
    console.log(err);
    res.send(404).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Job.findById(id);
    if (!data) {
      res.status(404).json({ error: "Job is not  found" });
    }
    res.json(data).status(200);
  } catch (error) {
    console.log(err);
    res.send(404).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
