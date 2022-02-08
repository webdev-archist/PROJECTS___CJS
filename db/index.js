const express = require("express");
const { google } = require("googleapis");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = "1UXLVfsBynI8l0tG7U3sXK7vONI_vVkoxd6Iec0E9tcw";






  // Read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "table!A:A",
  });
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "test!A:B",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [["oui", "non"]],
    },
  });
  console.log(JSON.stringify(getRows.data.values));
  res.send(JSON.stringify(Object.keys(getRows.data.values)));
});

app.post("/", async (req, res) => {
  const { request, name } = req.body;

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1UXLVfsBynI8l0tG7U3sXK7vONI_vVkoxd6Iec0E9tcw";

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  // Read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "table!A:A",
  });

  // Write row(s) to spreadsheet
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "table!A:B",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [["oui", "non"]],
    },
  });

  res.send("Successfully submitted! Thank you!");
});

app.listen(1337, (req, res) => console.log("running on 1337"));
