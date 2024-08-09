const path = require("path");
const PROJECT_DIR = "." ?? path.dirname(require.main.filename).split('/src/bin')[0];
console.log(PROJECT_DIR);

module.exports = {
  PROJECT_DIR,
  EVENT_SCHEDULE_TYPES: {
    INTERVIEW: "INTERVIEW",
    CUSTOM: 'CUSTOM',
    // OTHERS: 'OTHERS'
  },
  APPLICANT_INTERVIEW_STATUSES: {
    PENDING: "PENDING",
    COMPLETED: "COMPLETED",
  },
};
