const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/resume", (req, res) => {
  console.log(req.body);

  res.json({
    success: true,
    message: "Resume Data Received",
    data: req.body,
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});