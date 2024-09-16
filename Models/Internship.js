const mongoose = require("mongoose");
const InternshipSchema = new mongoose.Schema({
  company: "String",
  category: "String",
  duration: "String",
  createdAt: { type: Date, default: Date.now },
  Application: Object,
  title: "String",
  aboutCompany: "String",
  location: "String",
  experience: "String",
  aboutInternship: "String",
  whocanapply: "String",
  perks: Array,
  AdditionalInfo: "String",
  CTC: "String",
  startDate: "String",
  stipend: "String",
});

module.exports = mongoose.model("Internship", InternshipSchema);
