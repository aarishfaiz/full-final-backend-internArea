const express = require("express");
const router = express.Router();
const Internship = require("../Models/Internship");
const internshipd = require("../Data/InternshipData/InternshipData");

router.post("/", async (req, res) => {
  try {
    const internships = internshipd;
    const savedInternships = [];

    for (const intershipData of internships) {
      const newInternship = new Internship(intershipData);
      const savedInternship = await newInternship.save();
      savedInternships.push(savedInternship);
    }

    res.send(savedInternships);
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
      duration,
      title,
      aboutCompany,
      location,
      experience,
      aboutInternship,
      whoCanApply,
      perks,
      AdditionalInfo,
      CTC,
      startDate,
      stipend
    } = req.body;

    // Creating a new Internship document
    const newInternship = new Internship({
      company,
      category,
      duration,
      title,
      aboutCompany,
      location,
      experience,
      aboutInternship,
      whoCanApply,
      perks,
      AdditionalInfo,
      CTC,
      startDate,
      stipend
    });

    // Saving the internship to the database
    await newInternship.save();

    // Sending success response
    res.status(201).json({ message: "Internship created successfully", internship: newInternship });
  } catch (error) {
    // Sending error response if something goes wrong
    console.error("Error creating internship:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/", async (req, res) => {
  try {
    const data = await Internship.find();
    res.json(data).status(200);
  } catch (error) {
    console.log(err);
    res.send(404).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Internship.findById(id);
    if (!data) {
      res.status(404).json({ error: "Internship is not  found" });
    }
    res.json(data).status(200);
  } catch (error) {
    console.log(err);
    res.send(404).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
