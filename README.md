## I used `google-spreadsheet` to connect my app with google sheets.

<<<<<<< HEAD
- For any query contact me.
=======
This is a **Next.js** project with a frontend form that submits data to **Google Sheets** using the **Google Sheets API** configured via **Google Cloud Console**. It also includes a small **Google Apps Script** snippet to format the sheet data after submission.

---

## 🚀 Features

- Built with Next.js
- Sends form submissions to a Google Sheet via Google Sheets API
- Uses a service account for authentication
- Google Apps Script handles optional formatting/styling of incoming data
- Ideal for basic surveys, contact forms, or registration systems

---

## 📂 Getting Started

### 1. **Clone the Repository**

```bash
git clone https://github.com/jsmikat/from-to-sheets.git
cd form-to-sheets
npm install
```

### 2. **Create a Google Sheets API from your google console**

### 3. **Configure Environment Variables**
Create a `.env.local` file in your project root:
```env
GOOGLE_CLIENT_EMAIL=your-service-account-email@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_google_sheet_id
```

### 4. **Google Apps Script (Optional - For Formatting)**
- Create a new Google Sheet
- Open **Extensions > Apps Script**, delete any existing code, and paste the following script:
```App Script
function mergeCustomerOrderRows() {
  const spreadsheetId = "your_sheet_id";
  const sheetName = "sheet_name";
  const mergeColumns = ["A", "B", "C", "D", "E", "F", "J", "K", "L", "M", "N", "O"];
  const checkCol = 1;

  try {
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
    const range = sheet.getDataRange();
    const values = range.getValues();
    const lastRow = sheet.getRange(range.getNumRows() - 1, 1, 1, range.getNumColumns());
    if (lastRow.isPartOfMerge()) {
      lastRow.getMergedRanges().forEach((r) => {
        const startRow = r.getRow() - 1;
        const endRow = startRow + r.getNumRows() - 1;
        const startCol = r.getColumn() - 1;
        const endCol = startCol + r.getNumColumns() - 1;
        const v = values[startRow][startCol];
        for (let r = startRow; r <= endRow; r++) {
          for (let c = startCol; c <= endCol; c++) {
            if (!values[r]) {
              values[r] = [];
            }
            values[r][c] = v;
          }
        }
        r.breakApart();
      });
    }
    let temp = "";
    let tempAr = [];
    const ar = [];
    for (let i = 0; i < values.length; i++) {
      const v = values[i][checkCol - 1];
      const row = i + 1;
      if (v == temp) {
        tempAr.push(row);
      } else {
        if (tempAr.length > 0) {
          ar.push(tempAr);
        }
        tempAr = [row];
        temp = v;
      }
      if (i == values.length - 1 && tempAr.length > 0) {
        ar.push(tempAr);
      }
    }
    ar.filter(r => r.length > 1).forEach(r => {
      const start = r.shift();
      const end = r.pop();
      mergeColumns.forEach(m => {
        const range = sheet.getRange(`${m}${start}:${m}${end}`);
        if (!range.isPartOfMerge()) {
          range.merge();
        }
      });
    });

    SpreadsheetApp.flush();
    Logger.log("Merging completed based on the second column match.");
    return ContentService.createTextOutput("Merged cells successfully based on second column condition");
  } catch (error) {
    Logger.log(`Error: ${error.message}`);
    return ContentService.createTextOutput(`Error: ${error.message}`);
  }
}
```

### 5. **Run the Project**
```bash
npm run dev
```
Submit the form, your data should appear in the Google Sheet!
>>>>>>> 696aec7 (Update README.md.v3)
