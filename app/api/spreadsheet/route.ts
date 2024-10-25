import { NextRequest, NextResponse } from "next/server";

import { document } from "@/services/spreadsheetClient";

export async function GET(request: NextRequest) {
  try {
    await document.loadInfo();
    const sheet = document.sheetsByIndex[2];
    const rows = await sheet.getRows();
    const values = rows.map((row) => ({
      options: row.get("Options"),
      prices: row.get("Price"),
    }));
    const options = values.map((value) => value.options);
    const prices = values.map((value) => value.prices);

    return NextResponse.json({ options, prices }, { status: 200 });
  } catch (err) {
    console.error("Failed to get orders", err);
    return NextResponse.json(
      { error: "Failed to get orders\n", err },
      { status: 500 }
    );
  }
}
