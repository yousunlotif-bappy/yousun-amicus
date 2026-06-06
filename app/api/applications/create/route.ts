import { NextResponse } from "next/server";

import type { LoanApplication } from "@/data/applications";
import {
  createApplicationInDb,
  getNextApplicationId,
} from "@/lib/db-applications";

type CreateApplicationBody = {
  businessName?: string;
  ownerName?: string;
  businessType?: string;
  location?: string;
  requestedLoan?: string | number;
  averageMonthlySales?: string | number;
  existingEmi?: string | number;
  seasonality?: string;
  loanPurpose?: string;
  customerEmail?: string;
  documents?: string[];
};

const REQUIRED_FIELDS: (keyof CreateApplicationBody)[] = [
  "businessName",
  "ownerName",
  "businessType",
  "location",
  "requestedLoan",
  "averageMonthlySales",
  "existingEmi",
  "seasonality",
  "loanPurpose",
  "customerEmail",
];

/*
  POST /api/applications/create

  This route creates a new loan application from the customer portal
  or future bank officer submission form.

  Expected request body:
  {
    "businessName": "Rafi Grocery Store",
    "ownerName": "Rafi Khan",
    "businessType": "Grocery Retail",
    "location": "Dhaka, Bangladesh",
    "requestedLoan": 700000,
    "averageMonthlySales": 250000,
    "existingEmi": 5000,
    "seasonality": "Stable sales with Eid increase",
    "loanPurpose": "Working capital for inventory",
    "customerEmail": "rafi@amicus.ai"
  }
*/
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateApplicationBody;

    /*
      Basic required field validation.
      This keeps incomplete applications from entering MongoDB.
    */
    for (const field of REQUIRED_FIELDS) {
      if (!body[field]) {
        return NextResponse.json(
          {
            success: false,
            message: `${field} is required.`,
          },
          { status: 400 }
        );
      }
    }

    const requestedLoan = Number(body.requestedLoan);
    const averageMonthlySales = Number(body.averageMonthlySales);
    const existingEmi = Number(body.existingEmi);

    /*
      Number validation.
      Loan, sales, and EMI must be valid positive numbers.
    */
    if (
      !isValidPositiveNumber(requestedLoan) ||
      !isValidPositiveNumber(averageMonthlySales) ||
      !isValidNonNegativeNumber(existingEmi)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "requestedLoan, averageMonthlySales, and existingEmi must be valid numbers.",
        },
        { status: 400 }
      );
    }

    /*
      Generate a clean application ID.
      Example: APP-005
    */
    const id = await getNextApplicationId();

    /*
      Simple safe-loan estimate for newly submitted applications.
      The full Amicus agent can refine this later after running analysis.
    */
    const recommendedLoan = roundToNearest50000(
      Math.min(requestedLoan * 0.65, averageMonthlySales * 2.2)
    );

    /*
      Keep default documents if the form does not send any document list.
      This makes the demo flow smooth while still looking realistic.
    */
    const documents =
      Array.isArray(body.documents) && body.documents.length > 0
        ? body.documents
        : ["Trade License", "Bank Statement"];

    const application: LoanApplication = {
      id,
      businessName: String(body.businessName).trim(),
      ownerName: String(body.ownerName).trim(),
      businessType: String(body.businessType).trim(),
      location: String(body.location).trim(),
      requestedLoan,
      recommendedLoan,
      existingEmi,
      averageMonthlySales,
      riskLevel: "Medium",
      status: "AI Review Pending",
      productType: "Working Capital Bridge",
      seasonality: String(body.seasonality).trim(),
      twinScore: 700,
      businessHealth: 75,
      approvalReadiness: 65,
      documents,
      createdAt: new Date().toISOString().slice(0, 10),
      submittedBy: "customer",
      customerEmail: String(body.customerEmail).trim(),
      loanPurpose: String(body.loanPurpose).trim(),
    };

    /*
      Save the new application to MongoDB.
      After this, it can appear in the Applications list and be reviewed by Amicus.
    */
    await createApplicationInDb(application);

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully.",
      data: application,
    });
  } catch (error) {
    console.error("Failed to create application:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create application.",
        error: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
}

function roundToNearest50000(value: number): number {
  return Math.round(value / 50000) * 50000;
}

function isValidPositiveNumber(value: number): boolean {
  return Number.isFinite(value) && value > 0;
}

function isValidNonNegativeNumber(value: number): boolean {
  return Number.isFinite(value) && value >= 0;
}

