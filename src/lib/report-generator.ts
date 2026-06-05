import type { LoanApplication } from "@/data/applications";
import { formatBDT } from "@/data/applications";
import type { AmicusAnalysis } from "@/lib/agent-calculations";

/*
  YOUSUN Amicus Report Generator

  This file turns analysis results into structured reports.
  For now, reports are generated from rule-based demo data.
  Later, these sections can be enhanced with Gemini-generated language,
  saved into MongoDB, and exported as PDF.
*/

export type ReportType = "bank_memo" | "customer_summary" | "rescue_report";

export type ReportAudience = "Bank Officer" | "Borrower" | "Risk Manager";

export type ReportSection = {
  heading: string;
  body: string[];
};

export type GeneratedReport = {
  id: string;
  applicationId: string;
  title: string;
  type: ReportType;
  audience: ReportAudience;
  summary: string;
  sections: ReportSection[];
  generatedAt: string;
};

/*
  Demo report date.
  Keeping this in one place makes it easier to replace later
  with a real timestamp from the backend.
*/
const DEMO_REPORT_DATE = "2026-06-05";

/*
  Report 1: Bank Officer Credit Memo

  This report is written for internal bank review.
  It focuses on safe loan amount, risk evidence, and approval conditions.
*/
export function generateBankMemo(
  application: LoanApplication,
  analysis: AmicusAnalysis
): GeneratedReport {
  return {
    id: `RPT-BANK-${application.id}`,
    applicationId: application.id,
    title: "Bank Officer Credit Memo",
    type: "bank_memo",
    audience: "Bank Officer",
    generatedAt: DEMO_REPORT_DATE,
    summary: `Recommended approval support: ${formatBDT(
      analysis.recommendation.safeLoan
    )} ${application.productType} with dynamic EMI and 6-month monitoring.`,
    sections: [
      {
        heading: "Applicant Summary",
        body: [
          `Applicant: ${application.businessName}`,
          `Owner: ${application.ownerName}`,
          `Business Type: ${application.businessType}`,
          `Location: ${application.location}`,
          `Requested Loan: ${formatBDT(application.requestedLoan)}`,
        ],
      },
      {
        heading: "Amicus Recommendation",
        body: [
          `Safe Loan Amount: ${formatBDT(analysis.recommendation.safeLoan)}`,
          `Risky Zone: Above ${formatBDT(analysis.recommendation.riskyZone)}`,
          `Recommended Product: ${analysis.recommendation.productType}`,
          `Risk Level: ${analysis.recommendation.riskLevel}`,
          analysis.recommendation.decisionSupport,
        ],
      },
      {
        heading: "Financial Twin Evidence",
        body: [
          `Financial Twin Score: ${analysis.financialTwin.score}/900`,
          `Twin Grade: ${analysis.financialTwin.grade}`,
          `Cashflow Rhythm: ${analysis.financialTwin.cashflowRhythm}`,
          `Debt Stress: ${analysis.financialTwin.debtStress}`,
          `Emergency Buffer: ${analysis.financialTwin.emergencyBuffer}`,
        ],
      },
      {
        heading: "Future Mirror Stress Test",
        body: analysis.futureMirror.map(
          (scenario) =>
            `${scenario.name}: ${scenario.description} Projected default risk ${scenario.projectedDefaultRisk}%.`
        ),
      },
      {
        heading: "Approval Condition",
        body: [
          `Use dynamic EMI: normal month ${formatBDT(
            analysis.dynamicEmi.normalMonthEmi
          )}, high season ${formatBDT(
            analysis.dynamicEmi.highSeasonEmi
          )}, low season ${formatBDT(analysis.dynamicEmi.lowSeasonEmi)}.`,
          "Apply 6-month monitoring condition.",
          "Human officer review is required before final bank approval.",
        ],
      },
    ],
  };
}

/*
  Report 2: Customer-Friendly Loan Guidance

  This report explains the decision in simple borrower-friendly language.
  It should not sound like a rejection. The goal is to show a safer path.
*/
export function generateCustomerSummary(
  application: LoanApplication,
  analysis: AmicusAnalysis
): GeneratedReport {
  return {
    id: `RPT-CUSTOMER-${application.id}`,
    applicationId: application.id,
    title: "Customer-Friendly Loan Guidance",
    type: "customer_summary",
    audience: "Borrower",
    generatedAt: DEMO_REPORT_DATE,
    summary: `Your safer loan option is ${formatBDT(
      analysis.recommendation.safeLoan
    )} with a flexible EMI plan.`,
    sections: [
      {
        heading: "Simple Explanation",
        body: [
          `You requested ${formatBDT(application.requestedLoan)}.`,
          `Based on your current business cashflow, ${formatBDT(
            analysis.recommendation.safeLoan
          )} is a safer loan amount.`,
          "Your business has useful activity, but cashflow is seasonal. A smaller loan can reduce repayment pressure.",
        ],
      },
      {
        heading: "Why Full Amount Is Risky",
        body: [
          `Loan above ${formatBDT(
            analysis.recommendation.riskyZone
          )} may create repayment pressure during low-sales months.`,
          "If sales drop, EMI may become difficult to pay on time.",
          "The recommendation is designed to reduce debt pressure, not simply reject your request.",
        ],
      },
      {
        heading: "Recommended EMI Plan",
        body: [
          `Normal Month EMI: ${formatBDT(analysis.dynamicEmi.normalMonthEmi)}`,
          `High Season EMI: ${formatBDT(analysis.dynamicEmi.highSeasonEmi)}`,
          `Low Season EMI: ${formatBDT(analysis.dynamicEmi.lowSeasonEmi)}`,
          `Affordability: ${analysis.dynamicEmi.affordability}`,
        ],
      },
      {
        heading: "Next Best Action",
        body: [
          "Accept the safer working capital structure.",
          "Keep business bank statements updated.",
          "Use the support option early if sales become weak.",
        ],
      },
    ],
  };
}

/*
  Report 3: Rescue Before Default Report

  This report is for risk managers.
  It focuses on early warning signals and practical recovery actions
  before the borrower reaches full default.
*/
export function generateRescueReport(
  application: LoanApplication,
  analysis: AmicusAnalysis
): GeneratedReport {
  return {
    id: `RPT-RESCUE-${application.id}`,
    applicationId: application.id,
    title: "Rescue Before Default Report",
    type: "rescue_report",
    audience: "Risk Manager",
    generatedAt: DEMO_REPORT_DATE,
    summary: `Early distress response recommended: ${analysis.rescuePlan.bankAction}`,
    sections: [
      {
        heading: "Distress Status",
        body: [
          `Applicant: ${application.businessName}`,
          `Distress Level: ${analysis.rescuePlan.distressLevel}`,
          `Recovery Probability: ${analysis.rescuePlan.recoveryProbability}%`,
        ],
      },
      {
        heading: "Trigger Signals",
        body: analysis.rescuePlan.triggerSignals,
      },
      {
        heading: "Recommended Actions",
        body: [
          `Customer Action: ${analysis.rescuePlan.customerAction}`,
          `Bank Action: ${analysis.rescuePlan.bankAction}`,
          `Avoid Action: ${analysis.rescuePlan.avoidAction}`,
        ],
      },
      {
        heading: "Responsible Lending Note",
        body: [
          "This report is for decision-support only.",
          "Final restructuring decision must remain with the bank officer or risk manager.",
          "The recommended action prioritizes early support before default escalation.",
        ],
      },
    ],
  };
}

/*
  Generate all report types for one application.

  This is useful for the Report Center page because it gives us
  the bank memo, customer summary, and rescue report together.
*/
export function generateAllReports(
  application: LoanApplication,
  analysis: AmicusAnalysis
): GeneratedReport[] {
  return [
    generateBankMemo(application, analysis),
    generateCustomerSummary(application, analysis),
    generateRescueReport(application, analysis),
  ];
}


