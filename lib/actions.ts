"use server";

import { google } from "googleapis";

import { Inputs } from "@/components/OrderForm";

export async function postForm({ name, email, address }: Inputs) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
      ],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const date = new Date().toLocaleDateString("en-us");

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "CustomerInfo!A:D",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[name, email, address, date]],
      },
    });

    return { data: response.data, status: response.status };
  } catch (err) {
    console.error("Failed to submit the form", err);
    throw new Error("Failed to submit the form");
  }
}
