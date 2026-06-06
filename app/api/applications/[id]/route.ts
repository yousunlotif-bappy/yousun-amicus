import { NextResponse } from "next/server";

import { getApplicationByIdFromDb } from "@/lib/db-applications";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

/*
  GET /api/applications/:id

  Returns one loan application by application ID.
  Example: /api/applications/APP-001
*/
export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  const application = await getApplicationByIdFromDb(id);

  if (!application) {
    return NextResponse.json(
      {
        success: false,
        message: "Application not found",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: application,
  });
}


