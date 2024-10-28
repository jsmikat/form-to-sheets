"use server";

import { FormProps } from "@/lib/schema";
import { document } from "@/services/spreadsheetClient";

export async function postFormGoogleSpreadsheet({
  name,
  phone,
  email,
  address,
  product,
  quantity,
  paymentMethod,
  transactionId,
}: FormProps) {
  try {
    const date = new Date().toLocaleDateString("en-us");

    await document.loadInfo();

    const sheet = document.sheetsByIndex[1];

    await sheet.addRow({
      Date: date,
      "Customer Name": name,
      "Contact Number": phone,
      Email: email,
      Address: address,
      "Product ID": product,
      Quantity: quantity,
      "Payment Method": paymentMethod,
      "Transaction ID": transactionId,
    });

    return { status: 200 };
  } catch (err) {
    console.error("Failed to submit the form", err);
    throw new Error("Failed to submit the form");
  }
}

export async function getOptions() {
  try {
    await document.loadInfo();

    const sheet = document.sheetsByIndex[2];

    const rows = await sheet.getRows();

    const values = rows.map((row) => ({
      options: row.get("Options"),
      prices: row.get("Price"),
    }));

    const coverLink = rows[0].get("Cover Photo Drive Link");

    const options = values.map((value) => value.options);
    const prices = values.map((value) => value.prices);

    return { data: { options, prices, coverLink }, status: 200 };
  } catch (err) {
    console.error("Failed to get options", err);
    throw new Error("Failed to get options");
  }
}

// export async function postForm({ name, email, address }: FormProps) {
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
