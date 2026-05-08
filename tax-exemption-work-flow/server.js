require('dotenv').config();

const express = require("express");
const path = require('path');
const app = express();

const applicationRoutes = require("./routes/applicationRoutes");

app.use(express.json());
app.get('/',(req, res) => {
  res.send("Tax Exemption Workflow API is running");
});
app.use("/api", applicationRoutes);
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Tax Exemption Workflow API running on port ${PORT}`);
});