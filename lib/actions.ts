"use server";

import { customAlphabet } from "nanoid";

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
    const nanoid = customAlphabet(
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      10
    );
    const id = nanoid(12);
    await document.loadInfo();

    const sheet = document.sheetsByIndex[1];

    await sheet.addRow({
      UID: id,
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
