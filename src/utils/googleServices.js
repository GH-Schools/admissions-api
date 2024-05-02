// googleServices.js
const { google } = require("googleapis");
const sheets = google.sheets("v4");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

async function getAuthToken() {
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES,
  });
  const authToken = await auth.getClient();
  return authToken;
}

function mapValuesToObject(values, options = {}) {
  const headers = values.shift();
  let records = values;

  records = records.map((eachRecord) => {
    const returnValue = {};

    headers.forEach((title, index) => {
      const titleValue = eachRecord[index];
      returnValue[title] =
        titleValue === "TRUE" || titleValue === "FALSE"
          ? Boolean(titleValue)
          : titleValue;
    });

    return returnValue;
  });

  // console.log(records);
  return records;
}

async function appendToSpreadSheetValues({
  auth,
  sheetName = "Sheet1",
  spreadsheetId = process.env.SHEET_ID,
  values = [[]],
}) {
  try {
    const res = await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: sheetName,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        // range: '',
        // majorDimension: enum(Dimension),
        values,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
}

async function getSpreadSheet({ spreadsheetId = process.env.SHEET_ID, auth }) {
  const res = await sheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });
  return res;
}

async function getSpreadSheetValues({
  auth,
  sheetName = "Sheet1",
  spreadsheetId = process.env.SHEET_ID,
}) {
  const res = await sheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: sheetName,
  });
  return res;
}

async function getSpreadSheetBatchValues({
  auth,
  sheetName = "Sheet1",
  spreadsheetId = process.env.SHEET_ID,
}) {
  const res = await sheets.spreadsheets.values.batchGetByDataFilter({
    auth,
    spreadsheetId,
    // range: sheetName,
    requestBody: {
      dataFilters: [{ a1Range: sheetName }],
    },
  });
  return res;
}

module.exports = {
  mapValuesToObject,
  getAuthToken,
  getSpreadSheet,
  getSpreadSheetValues,
  getSpreadSheetBatchValues,
  appendToSpreadSheetValues,
};
