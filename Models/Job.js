const mongoose = require("mongoose");
const JobSchema = new mongoose.Schema({
  company: "String",
  category: "String",
  createdAt: { type: Date, default: Date.now },
  Application: Object,
  title: "String",
  aboutCompany: "String",
  aboutJob: "String",
  location: "String",
  Experience: "String",
  aboutJob: "String",
  whocanapply: "String",
  perks: Array,
  AdditionalInformation: "String",
  CTC: "String",
  startDate: "String",
});

module.exports = mongoose.model("Job", JobSchema);
