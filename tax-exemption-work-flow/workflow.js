const STATES = {
  SUBMITTED: "SUBMITTED",
  VALIDATION_FAILED: "VALIDATION_FAILED",
  UNDER_REVIEW: "UNDER_REVIEW",
  ADDITIONAL_INFO_REQUIRED: "ADDITIONAL_INFO_REQUIRED",
  COMPLIANCE_CHECK: "COMPLIANCE_CHECK",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED"
};

function validateApplication(application) {
  if (!application.documents || application.documents.length === 0) {
    application.status = STATES.VALIDATION_FAILED;
    return false;
  }

  application.status = STATES.UNDER_REVIEW;
  return true;
}

function complianceCheck(application) {
  if (application.taxDebt === true) {
    application.status = STATES.REJECTED;
    return false;
  }

  application.status = STATES.COMPLIANCE_CHECK;
  return true;
}

function requestAdditionalInfo(application) {
  application.status = STATES.ADDITIONAL_INFO_REQUIRED;
}

function approveApplication(application) {
  application.status = STATES.APPROVED;
}

function rejectApplication(application) {
  application.status = STATES.REJECTED;
}

module.exports = {
  STATES,
  validateApplication,
  complianceCheck,
  requestAdditionalInfo,
  approveApplication,
  rejectApplication
};