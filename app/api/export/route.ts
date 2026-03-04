import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "logs.json");

    if (!fs.existsSync(filePath)) {
      return new NextResponse("No data available", { status: 400 });
    }

    const raw = fs.readFileSync(filePath, "utf-8");

    if (!raw.trim()) {
      return new NextResponse("No data available", { status: 400 });
    }

    // Parse newline JSON
    const rows = raw
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line));

    // Get CSV headers
    const headers = Object.keys(rows[0]);

    const csv =
      headers.join(",") +
      "\n" +
      rows
        .map((row) =>
          headers.map((field) => JSON.stringify(row[field] ?? "")).join(",")
        )
        .join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=experiment_data.csv",
      },
    });
  } catch (error) {
    return new NextResponse("Error generating CSV", { status: 500 });
  }
}