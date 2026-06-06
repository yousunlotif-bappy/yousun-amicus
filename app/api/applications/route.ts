import { NextResponse } from "next/server";

import { getAllApplicationsFromDb } from "@/lib/db-applications";

/*
  GET /api/applications

  Returns all loan applications from MongoDB.
  If MongoDB has a problem, db-applications.ts will safely fall back to demo data.
*/
export async function GET() {
  const applications = await getAllApplicationsFromDb();

  return NextResponse.json({
    success: true,
    data: applications,
  });
}


