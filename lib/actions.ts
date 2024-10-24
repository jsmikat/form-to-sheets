"use server";

import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

import { Inputs } from "@/components/OrderForm";

// export async function postForm({ name, email, address }: Inputs) {
//   try {
//     const auth = new google.auth.GoogleAuth({
//       credentials: {
//         client_email: process.env.GOOGLE_CLIENT_EMAIL,
//         private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//       },
//       scopes: [
//         "https://www.googleapis.com/auth/spreadsheets",
//         "https://www.googleapis.com/auth/drive",
//         "https://www.googleapis.com/auth/drive.file",
//       ],
//     });

//     const sheets = google.sheets({
//       auth,
//       version: "v4",
//     });

//     const date = new Date().toLocaleDateString("en-us");

//     const response = await sheets.spreadsheets.values.append({
//       spreadsheetId: process.env.GOOGLE_SHEET_ID,
//       range: "CustomerInfo!A:D",
//       valueInputOption: "USER_ENTERED",
//       requestBody: {
//         values: [[name, email, address, date]],
//       },
//     });

//     return { data: response.data, status: response.status };
//   } catch (err) {
//     console.error("Failed to submit the form", err);
//     throw new Error("Failed to submit the form");
//   }
// }

export async function postFormGoogleSpreadsheet({
  name,
  email,
  address,
}: Inputs) {
  try {
    const auth = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive.file",
      ],
    });

    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_SHEET_ID as string,
      auth
    );

    const date = new Date().toLocaleDateString("en-us");

    await doc.loadInfo();
    console.log(doc.title);

    const sheet = doc.sheetsByIndex[0];

    await sheet.addRow({
      Email: email,
      Name: name,
      Address: address,
      Date: date,
    });

    return { status: 200 };
  } catch (err) {
    console.error("Failed to submit the form", err);
    throw new Error("Failed to submit the form");
  }
}
