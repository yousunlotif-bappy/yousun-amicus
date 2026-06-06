import { NextResponse } from "next/server";

import { getAllReportsFromDb } from "@/lib/db-reports";

/*
  GET /api/reports

  Returns all generated reports from MongoDB.
  If MongoDB is unavailable, fallback demo reports will be returned.
*/
export async function GET() {
  const reports = await getAllReportsFromDb();

  return NextResponse.json({
    success: true,
    data: reports,
  });
}

