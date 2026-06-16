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
You are a professional ATS Resume Expert and Career Coach.

Analyze the following resume details and provide detailed suggestions.

Candidate Information:

Name: ${formData.name}

Education:
- Degree: ${formData.degree}
- College: ${formData.college}
- CGPA: ${formData.cgpa}
- Graduation Year: ${formData.graduationYear}

Experience:
- Company: ${formData.company}
- Role: ${formData.role}
- Duration: ${formData.duration}
- Description: ${formData.experienceDescription}

Skills:
${formData.skills}

Please provide:

1. Professional Summary (2-3 lines)

2. ATS Resume Score (out of 100)

3. Missing Keywords for ATS

4. Skill Improvement Suggestions

5. Experience Improvement Suggestions

6. Resume Strengths

7. Resume Weaknesses

8. Final ATS Optimization Recommendations

Format the response clearly using headings and bullet points.
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