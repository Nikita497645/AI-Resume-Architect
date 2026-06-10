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
Improve the following resume and provide professional suggestions.

Name: ${formData.name}
Education: ${formData.degree} at ${formData.college}
Experience: ${formData.role} at ${formData.company}
Skills: ${formData.skills}

Give:
1. Professional Summary
2. Skill Improvements
3. Experience Improvements
4. ATS Optimization Suggestions
`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    res.status(200).json({
      success: true,
      response: completion.choices[0].message.content,
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