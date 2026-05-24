const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const Resume = require("./models/Resume");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CareerForge Pro Backend Running");
});

app.post("/api/resume", async (req, res) => {

  try {

    const newResume = new Resume(req.body);

    await newResume.save();

    res.status(201).json({
      success: true,
      message: "Resume saved successfully",
      data: newResume,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error saving resume",
    });

  }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});