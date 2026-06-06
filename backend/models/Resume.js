const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  college: {
    type: String,
  },

  degree: {
    type: String,
  },

  cgpa: {
    type: String,
  },

  graduationYear: {
    type: String,
  },

  company: {
    type: String,
  },

  role: {
    type: String,
  },

  duration: {
    type: String,
  },

  experienceDescription: {
    type: String,
  },

  skills: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Resume", resumeSchema);