import { NextResponse } from "next/server";

import { getApplicationByIdFromDb } from "@/lib/db-applications";
import { getReportByIdFromDb } from "@/lib/db-reports";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

/*
  GET /api/reports/:id

  Returns one report with its related loan application.
  Example: /api/reports/RPT-BANK-APP-001
*/
export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  const report = await getReportByIdFromDb(id);

  if (!report) {
    return NextResponse.json(
      {
        success: false,
        message: "Report not found",
      },
      { status: 404 }
    );
  }

  const application = await getApplicationByIdFromDb(report.applicationId);

  if (!application) {
    return NextResponse.json(
      {
        success: false,
        message: "Related application not found",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      report,
      application,
    },
  });
}


