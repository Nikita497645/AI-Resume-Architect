const express = require("express");
const dotenv = require("dotenv");
const Groq = require("groq-sdk");

dotenv.config();

const router = express.Router();

console.log("GROQ KEY FOUND:", !!process.env.GROQ_API_KEY);

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/improve", async (req, res) => {
  try {
    const { formData } = req.body;

    const prompt = `
You are an expert ATS Resume Reviewer.

Candidate Information:

Name: ${formData.name}
Degree: ${formData.degree}
College: ${formData.college}
Role: ${formData.role}
Company: ${formData.company}
Skills: ${formData.skills}
Experience: ${formData.experienceDescription}

Provide:

1. Professional Summary
2. ATS Score out of 100
3. Missing Keywords
4. Resume Improvements
5. Final Recommendations

Keep response concise and professional.
`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.1-8b-instant",
    });

    res.status(200).json({
      success: true,
      aiResponse: completion.choices[0].message.content,
    });
  } catch (error) {
    console.log("Groq Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate AI suggestions",
      error: error.message,
    });
  }
});

module.exports = router;