const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const store = require("../data/store");
const workflow = require("../workflow");
const ApplicationModel = require("../models/applicationModel");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/apply", upload.single("documents"), (req, res) => {

  const application = {
    id: uuidv4(),
    applicant: req.body.applicant,
    documents: req.file,
    taxDebt: req.body.taxDebt === "true",
    status: workflow.STATES.SUBMITTED
  };

  store.applications.push(application);

  res.json(application);

});

router.get("/applications", (req, res) => {
 
  res.json(store.applications);
});

router.post("/review/:id", (req, res) => {
  const app = store.applications.find(a => a.id === req.params.id);

  if (!app) return res.status(404).json({error: "Application not found"});

  const compliant = workflow.complianceCheck(app);

  if (!compliant) {
    return res.json(app);
  }

  res.json(app);
});

router.post("/request-info/:id", (req, res) => {
  const app = store.applications.find(a => a.id === req.params.id);

  workflow.requestAdditionalInfo(app);

  res.json(app);
});

router.post("/approve/:id", (req, res) => {
  const app = store.applications.find(a => a.id === req.params.id);

  workflow.approveApplication(app);

  res.json(app);
});

router.post("/reject/:id", (req, res) => {
  const app = store.applications.find(a => a.id === req.params.id);

  workflow.rejectApplication(app);

  res.json(app);
});

// router.post("/apply", async (req, res) => {
//   try {

//     const application = {
//       id: uuidv4(),
//       applicant: req.body.applicant,
//       documents: req.body.documents || [],
//       taxDebt: req.body.taxDebt || false,
//       status: workflow.STATES.SUBMITTED
//     };

//     workflow.validateApplication(application);

//     const saved = await ApplicationModel.createApplication(application);

//     res.json(saved);

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.get("/applications", async (req, res) => {

//   const apps = await ApplicationModel.getAllApplications();

//   res.json(apps);
// });


module.exports = router;