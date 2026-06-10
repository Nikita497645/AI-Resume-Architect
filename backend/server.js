const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

console.log("SERVER KEY FOUND:", !!process.env.GROQ_API_KEY);

const connectDB = require("./config/db");
const Resume = require("./models/Resume");
const aiRoutes = require("./routes/aiRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);

/* Root Route */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CareerForge Pro Backend Running",
  });
});

/* Save Resume API */

app.post("/api/resume", async (req, res) => {
  try {
    const newResume = new Resume(req.body);

    const savedResume = await newResume.save();

    res.status(201).json({
      success: true,
      message: "Resume saved successfully",
      data: savedResume,
    });
  } catch (error) {
    console.log("Resume Save Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save resume",
      error: error.message,
    });
  }
});

/* Update Resume API */

app.put("/api/resume/:id", async (req, res) => {
  try {
    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      data: updatedResume,
    });
  } catch (error) {
    console.log("Resume Update Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update resume",
      error: error.message,
    });
  }
});

/* Server */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});