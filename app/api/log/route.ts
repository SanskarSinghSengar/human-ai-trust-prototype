import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const filePath = path.join(process.cwd(), "logs.json");

  fs.appendFileSync(filePath, JSON.stringify(body) + "\n");

  return NextResponse.json({ status: "success" });
}