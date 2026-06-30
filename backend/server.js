const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const puppeteer = require("puppeteer");

dotenv.config();

console.log("SERVER KEY FOUND:", !!process.env.GROQ_API_KEY);

const connectDB = require("./config/db");
const Resume = require("./models/Resume");
const aiRoutes = require("./routes/aiRoutes");
const pdfRoutes = require("./routes/pdfRoutes");
const compression = require("compression");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(compression());

app.use("/api/ai", aiRoutes);
app.use("/api/pdf", pdfRoutes);

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

/* Generate PDF API */

app.post("/api/generate-pdf", async (req, res) => {
  try {
    const { formData } = req.body;

    const browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();

    await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
    <style>

    @page {
      size: A4;
      margin: 25px;
   }
    body{
      font-family: Arial, sans-serif;
      padding:40px;
      color:#333;
      line-height:1.6;
   }

   .header{
      text-align:center;
      border-bottom:3px solid #2563eb;
      padding-bottom:15px;
    }

    .name{
      font-size:32px;
      font-weight:bold;
      color:#1e40af;
    }

    .section{
      page-break-inside: avoid;
    }

    .section h2{
      color:#2563eb;
      border-bottom:2px solid #dbeafe;
      padding-bottom:5px;
      margin-bottom:15px;
    }

    .skills{
      display:flex;
      flex-wrap:wrap;
      gap:8px;
   }

   .skill{
     background:#2563eb;
     color:white;
     padding:6px 12px;
     border-radius:20px;
     font-size:12px;
   }

.info{
  margin-top:8px;
}

p{
  margin:8px 0;
}
</style>
</head>

<body>

<div class="header">
  <div class="name">${formData.name || "Your Name"}</div>
  <p>${formData.email || ""}</p>
  <p>${formData.phone || ""}</p>
</div>

<div class="section">
  <h2>Education</h2>
  <p><strong>Degree:</strong> ${formData.degree || ""}</p>
  <p><strong>College:</strong> ${formData.college || ""}</p>
  <p><strong>Graduation Year:</strong> ${formData.graduationYear || ""}</p>
  <p><strong>CGPA:</strong> ${formData.cgpa || ""}</p>
</div>

<div class="section">
  <h2>Experience</h2>
  <p><strong>Role:</strong> ${formData.role || ""}</p>
  <p><strong>Company:</strong> ${formData.company || ""}</p>
  <p><strong>Duration:</strong> ${formData.duration || ""}</p>
  <p><strong>Description:</strong> ${formData.experienceDescription || ""}</p>
</div>

<div class="section">
  <h2>Skills</h2>

  <div class="skills">
    ${(formData.skills || "")
      .split(",")
      .map(
        skill => `
          <span class="skill">
            ${skill.trim()}
          </span>
        `
      )
      .join("")}
  </div>

</div>

</body>
</html>
`);

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdf.length,
    });

    return res.send(pdf);

  } catch (error) {
    console.log("PDF Generation Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate PDF",
      error: error.message,
    });
  }
});

/* Server */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});