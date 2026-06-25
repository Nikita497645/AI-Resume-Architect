const express = require("express");
const PDFDocument = require("pdfkit");

const router = express.Router();

router.post("/download-pdf", async (req, res) => {
  try {
    const data = req.body;

    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
    });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=resume.pdf"
    );

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    doc.pipe(res);

    // ---------------- HEADER ----------------

    doc
      .fillColor("#2563eb")
      .fontSize(28)
      .font("Helvetica-Bold")
      .text(data.name || "YOUR NAME", {
        align: "center",
      });

    doc.moveDown(0.3);

    doc
      .fillColor("black")
      .fontSize(11)
      .font("Helvetica")
      .text(data.email || "", {
        align: "center",
      });

    doc.text(data.phone || "", {
      align: "center",
    });

    doc.moveDown();

    doc
      .strokeColor("#2563eb")
      .lineWidth(3)
      .moveTo(50, doc.y)
      .lineTo(545, doc.y)
      .stroke();

    doc.moveDown();

    // ---------------- EDUCATION ----------------

    doc
      .fillColor("#2563eb")
      .fontSize(22)
      .font("Helvetica-Bold")
      .text("Education");

    doc
      .strokeColor("#cfe0ff")
      .lineWidth(1)
      .moveTo(50, doc.y + 4)
      .lineTo(545, doc.y + 4)
      .stroke();

    doc.moveDown();

    doc.fontSize(12).fillColor("black");

    doc.font("Helvetica-Bold").text("Degree: ", {
      continued: true,
    });
    doc.font("Helvetica").text(data.degree || "");

    doc.font("Helvetica-Bold").text("College: ", {
      continued: true,
    });
    doc.font("Helvetica").text(data.college || "");

    doc.font("Helvetica-Bold").text("Graduation Year: ", {
      continued: true,
    });
    doc.font("Helvetica").text(data.graduationYear || "");

    doc.font("Helvetica-Bold").text("CGPA: ", {
      continued: true,
    });
    doc.font("Helvetica").text(data.cgpa || "");

    doc.moveDown(1.5);

    // ---------------- EXPERIENCE ----------------

    doc
      .fillColor("#2563eb")
      .fontSize(22)
      .font("Helvetica-Bold")
      .text("Experience");

    doc
      .strokeColor("#cfe0ff")
      .lineWidth(1)
      .moveTo(50, doc.y + 4)
      .lineTo(545, doc.y + 4)
      .stroke();

    doc.moveDown();

    doc.fillColor("black").fontSize(12);

    doc.font("Helvetica-Bold").text("Role: ", {
      continued: true,
    });
    doc.font("Helvetica").text(data.role || "");

    doc.font("Helvetica-Bold").text("Company: ", {
      continued: true,
    });
    doc.font("Helvetica").text(data.company || "");

    doc.font("Helvetica-Bold").text("Duration: ", {
      continued: true,
    });
    doc.font("Helvetica").text(data.duration || "");

    doc.font("Helvetica-Bold").text("Description: ", {
      continued: true,
    });
    doc.font("Helvetica").text(
      data.experienceDescription || ""
    );

    doc.moveDown(1.5);

    // ---------------- SKILLS ----------------

    doc
      .fillColor("#2563eb")
      .fontSize(22)
      .font("Helvetica-Bold")
      .text("Skills");

    doc
      .strokeColor("#cfe0ff")
      .lineWidth(1)
      .moveTo(50, doc.y + 4)
      .lineTo(545, doc.y + 4)
      .stroke();

    doc.moveDown();

    const skills = data.skills
      ? data.skills.split(",")
      : [];

    let x = 50;
    let y = doc.y;

    skills.forEach((skill) => {
      const text = skill.trim().toUpperCase();

      const width = doc.widthOfString(text) + 20;

      if (x + width > 545) {
        x = 50;
        y += 35;
      }

      doc
        .roundedRect(x, y, width, 22, 11)
        .fill("#2563eb");

      doc
        .fillColor("white")
        .fontSize(9)
        .text(text, x, y + 6, {
          width,
          align: "center",
        });

      x += width + 8;
    });

    doc.end();
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "PDF generation failed",
    });
  }
});

module.exports = router;