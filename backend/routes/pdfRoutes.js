const express = require("express");
const PDFDocument = require("pdfkit");

const router = express.Router();

router.post("/download-pdf", async (req, res) => {
  try {
    const data = req.body;

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=resume.pdf"
    );

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    doc.pipe(res);

    doc
      .fontSize(24)
      .text(data.name || "Resume", {
        align: "center",
      });

    doc.moveDown();

    doc.fontSize(12).text(`Email: ${data.email}`);
    doc.text(`Phone: ${data.phone}`);

    doc.moveDown();

    doc.fontSize(18).text("Education");
    doc.text(`${data.degree}`);
    doc.text(`${data.college}`);
    doc.text(`${data.graduationYear}`);
    doc.text(`CGPA: ${data.cgpa}`);

    doc.moveDown();

    doc.fontSize(18).text("Experience");
    doc.text(`${data.role}`);
    doc.text(`${data.company}`);
    doc.text(`${data.duration}`);
    doc.text(`${data.experienceDescription}`);

    doc.moveDown();

    doc.fontSize(18).text("Skills");
    doc.text(`${data.skills}`);

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