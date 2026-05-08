const db = require("../db/db");

async function createApplication(app) {
  const query = `
    INSERT INTO applications(id, applicant, documents, tax_debt, status)
    VALUES($1,$2,$3,$4,$5)
    RETURNING *
  `;

  const values = [
    app.id,
    app.applicant,
    JSON.stringify(app.documents),
    app.taxDebt,
    app.status
  ];

  const result = await db.query(query, values);
  return result.rows[0];
}

async function getAllApplications() {
  const result = await db.query("SELECT * FROM applications ORDER BY created_at DESC");
  return result.rows;
}

async function getApplicationById(id) {
  const result = await db.query(
    "SELECT * FROM applications WHERE id=$1",
    [id]
  );

  return result.rows[0];
}

async function updateApplicationStatus(id, status) {
  const result = await db.query(
    "UPDATE applications SET status=$1 WHERE id=$2 RETURNING *",
    [status, id]
  );

  return result.rows[0];
}

module.exports = {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus
};