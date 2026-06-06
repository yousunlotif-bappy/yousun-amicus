import type { LoanApplication } from "@/data/applications";
import { formatBDT } from "@/data/applications";
import type { AmicusAnalysis } from "@/lib/agent-calculations";
import {
  generateBankMemo,
  generateCustomerSummary,
  generateRescueReport,
  type GeneratedReport,
} from "@/lib/report-generator";
import { generateGeminiText } from "@/lib/gemini";

/*
  Gemini Report Generator for YOUSUN Amicus

  This file tries to generate report content using Gemini.
  If Gemini is not configured, fails, or returns an issue,
  the app safely falls back to the rule-based report generator.

  This is important for demo safety:
  - Gemini available  → AI-written report
  - Gemini unavailable → normal fallback report
*/

type GeminiReportKind = "bank_memo" | "customer_summary" | "rescue_report";

export async function generateGeminiReport(
  application: LoanApplication,
  analysis: AmicusAnalysis,
  kind: GeminiReportKind
): Promise<GeneratedReport> {
  try {
    /*
      Build a clear prompt for the selected report type.
      The prompt includes borrower data, analysis result, and safety rules.
    */
    const prompt = buildPrompt(application, analysis, kind);

    /*
      Ask Gemini to write the report.
      The response will be converted into our app's report format below.
    */
    const geminiText = await generateGeminiText(prompt);

    return convertGeminiTextToReport(application, kind, geminiText);
  } catch (error) {
    /*
      Fallback is intentional.
      A contest demo should not break just because an AI API key,
      quota, network, or safety response fails.
    */
    console.error(
      "Gemini report generation failed. Using fallback report.",
      error
    );

    if (kind === "bank_memo") {
      return generateBankMemo(application, analysis);
    }

    if (kind === "customer_summary") {
      return generateCustomerSummary(application, analysis);
    }

    return generateRescueReport(application, analysis);
  }
}

/*
  Build a report-specific Gemini prompt.

  We keep the prompt structured so Gemini writes consistent,
  professional, and responsible report content.
*/
function buildPrompt(
  application: LoanApplication,
  analysis: AmicusAnalysis,
  kind: GeminiReportKind
): string {
  const reportAudience = getReportAudience(kind);
  const reportTitle = getReportTitle(kind);

  return `
You are YOUSUN Amicus, a responsible lending decision-support agent.

Write a ${reportTitle} for this audience: ${reportAudience}.

Important safety rules:
- Do not make final loan approval decisions.
- Use decision-support language only.
- Do not discriminate.
- Do not suggest aggressive collection as the first action.
- Include a responsible AI note.
- Keep the writing clear, practical, and professional.

Applicant data:
- Application ID: ${application.id}
- Business Name: ${application.businessName}
- Owner Name: ${application.ownerName}
- Business Type: ${application.businessType}
- Location: ${application.location}
- Requested Loan: ${formatBDT(application.requestedLoan)}
- Recommended/Safe Loan: ${formatBDT(analysis.recommendation.safeLoan)}
- Risky Zone: Above ${formatBDT(analysis.recommendation.riskyZone)}
- Existing EMI: ${formatBDT(application.existingEmi)}
- Average Monthly Sales: ${formatBDT(application.averageMonthlySales)}
- Product Type: ${application.productType}
- Seasonality: ${application.seasonality}

Financial Twin:
- Score: ${analysis.financialTwin.score}/900
- Grade: ${analysis.financialTwin.grade}
- Cashflow Rhythm: ${analysis.financialTwin.cashflowRhythm}
- Debt Stress: ${analysis.financialTwin.debtStress}
- Emergency Buffer: ${analysis.financialTwin.emergencyBuffer}

Dynamic EMI:
- Normal Month EMI: ${formatBDT(analysis.dynamicEmi.normalMonthEmi)}
- High Season EMI: ${formatBDT(analysis.dynamicEmi.highSeasonEmi)}
- Low Season EMI: ${formatBDT(analysis.dynamicEmi.lowSeasonEmi)}
- Affordability: ${analysis.dynamicEmi.affordability}

Rescue Plan:
- Distress Level: ${analysis.rescuePlan.distressLevel}
- Bank Action: ${analysis.rescuePlan.bankAction}
- Avoid Action: ${analysis.rescuePlan.avoidAction}
- Recovery Probability: ${analysis.rescuePlan.recoveryProbability}%

Write the report in this format:

Summary:
[one short summary paragraph]

Sections:
1. [Heading]
- [point]
- [point]

2. [Heading]
- [point]
- [point]

3. [Heading]
- [point]
- [point]

Responsible AI Note:
[short note]
`.trim();
}

/*
  Convert Gemini's plain text response into the same report shape
  used by the rest of the app.

  For now, we store Gemini text as clean paragraph blocks.
  Later, we can add stricter JSON output parsing if needed.
*/
function convertGeminiTextToReport(
  application: LoanApplication,
  kind: GeminiReportKind,
  geminiText: string
): GeneratedReport {
  const title = getReportTitle(kind);
  const audience = getReportAudience(kind);

  return {
    id: buildReportId(application.id, kind),
    applicationId: application.id,
    title,
    type: kind,
    audience,
    generatedAt: new Date().toISOString().slice(0, 10),
    summary: getFirstParagraph(geminiText),
    sections: [
      {
        heading: "Gemini Generated Report",
        body: splitGeminiTextIntoReadableBlocks(geminiText),
      },
    ],
  };
}

/*
  Create a stable report ID that matches our existing report pattern.
*/
function buildReportId(applicationId: string, kind: GeminiReportKind): string {
  if (kind === "bank_memo") {
    return `RPT-BANK-${applicationId}`;
  }

  if (kind === "customer_summary") {
    return `RPT-CUSTOMER-${applicationId}`;
  }

  return `RPT-RESCUE-${applicationId}`;
}

/*
  Human-friendly report titles.
*/
function getReportTitle(kind: GeminiReportKind): string {
  if (kind === "bank_memo") {
    return "Bank Officer Credit Memo";
  }

  if (kind === "customer_summary") {
    return "Customer-Friendly Loan Guidance";
  }

  return "Rescue Before Default Report";
}

/*
  Each report is written for a different audience.
*/
function getReportAudience(
  kind: GeminiReportKind
): "Bank Officer" | "Borrower" | "Risk Manager" {
  if (kind === "bank_memo") {
    return "Bank Officer";
  }

  if (kind === "customer_summary") {
    return "Borrower";
  }

  return "Risk Manager";
}

/*
  Use the first meaningful paragraph as the report summary.
*/
function getFirstParagraph(text: string): string {
  const firstParagraph = text
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.length > 0);

  return firstParagraph || "Gemini generated a report for this application.";
}

/*
  Turn Gemini text into readable blocks for our report UI.
  Empty lines are removed so the report page stays clean.
*/
function splitGeminiTextIntoReadableBlocks(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

