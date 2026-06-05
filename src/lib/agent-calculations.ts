import type { LoanApplication } from "@/data/applications";

/*
  YOUSUN Amicus Analysis Engine

  This file contains the demo logic behind the agent workflow.
  For now, the calculations are rule-based so the MVP can work without a backend.
  Later, these functions can be connected with MongoDB, Gemini, and Agent Builder.
*/

export type FinancialTwinResult = {
  score: number;
  grade: "Excellent" | "Good" | "Watch" | "Risky";
  cashflowRhythm: string;
  debtStress: "Low" | "Medium" | "High";
  emergencyBuffer: "Strong" | "Moderate" | "Weak";
  repaymentCapacity: string;
  explanation: string;
};

export type FutureMirrorScenario = {
  name: string;
  description: string;
  riskLevel: "Low" | "Medium" | "High";
  projectedDefaultRisk: number;
  impact: string;
};

export type LoanRecommendation = {
  requestedLoan: number;
  safeLoan: number;
  riskyZone: number;
  productType: string;
  riskLevel: "Low" | "Medium" | "High";
  decisionSupport: string;
  reason: string;
};

export type DynamicEmiPlan = {
  normalMonthEmi: number;
  highSeasonEmi: number;
  lowSeasonEmi: number;
  affordability: "High" | "Medium" | "Low";
  explanation: string;
};

export type RescuePlan = {
  distressLevel: "Low" | "Medium" | "High";
  triggerSignals: string[];
  customerAction: string;
  bankAction: string;
  avoidAction: string;
  recoveryProbability: number;
};

export type AmicusAnalysis = {
  financialTwin: FinancialTwinResult;
  futureMirror: FutureMirrorScenario[];
  recommendation: LoanRecommendation;
  dynamicEmi: DynamicEmiPlan;
  rescuePlan: RescuePlan;
};

/*
  Step 1: Build the Financial Twin.

  This creates a score from the borrower’s current business profile.
  The goal is not to replace a bank officer, but to highlight risk signals clearly.
*/
export function calculateFinancialTwin(
  application: LoanApplication
): FinancialTwinResult {
  const monthlySales = Math.max(application.averageMonthlySales, 1);

  const emiPressure = application.existingEmi / monthlySales;
  const requestedLoanPressure = application.requestedLoan / monthlySales;

  let score = 900;

  /*
    Existing EMI pressure:
    If the borrower already carries a noticeable EMI burden,
    the Financial Twin score should become more cautious.
  */
  if (emiPressure > 0.08) score -= 80;
  if (emiPressure > 0.12) score -= 120;

  /*
    Requested loan pressure:
    A loan request that is too large compared to monthly sales
    may create repayment pressure during weaker months.
  */
  if (requestedLoanPressure > 3) score -= 70;
  if (requestedLoanPressure > 4) score -= 110;

  /*
    Application risk level from the demo data.
    This lets the page show different outcomes for Low, Medium, and High risk cases.
  */
  if (application.riskLevel === "Medium") score -= 60;
  if (application.riskLevel === "High") score -= 150;

  /*
    Documents matter.
    More supporting documents make the application easier to verify.
  */
  if (application.documents.length < 2) score -= 70;
  if (application.documents.length >= 3) score += 25;

  /*
    Seasonal businesses are not automatically bad.
    But they need flexible repayment planning, so we apply a small caution adjustment.
  */
  if (hasSeasonality(application.seasonality)) {
    score -= 35;
  }

  score = clamp(Math.round(score), 420, 890);

  const grade = getTwinGrade(score);
  const debtStress = getDebtStress(emiPressure);
  const emergencyBuffer = getEmergencyBuffer(application);

  return {
    score,
    grade,
    cashflowRhythm: hasSeasonality(application.seasonality)
      ? "Seasonal but stable"
      : "Stable monthly rhythm",
    debtStress,
    emergencyBuffer,
    repaymentCapacity:
      grade === "Excellent" || grade === "Good"
        ? "Repayment capacity is acceptable with safeguards."
        : "Repayment capacity needs careful officer review.",
    explanation:
      "The borrower has meaningful business activity, but seasonal cashflow and requested loan pressure require a safer loan structure.",
  };
}

/*
  Step 2: Run the Future Mirror.

  This creates three simple future scenarios:
  growth, steady, and stress. It helps the officer see what could happen
  after the loan is approved.
*/
export function runFutureMirror(
  application: LoanApplication
): FutureMirrorScenario[] {
  const baseRisk = getBaseDefaultRisk(application.riskLevel);

  return [
    {
      name: "Growth Scenario",
      description: "Sales improve and repayment remains comfortable.",
      riskLevel: "Low",
      projectedDefaultRisk: Math.max(1, baseRisk - 4),
      impact: "+18%",
    },
    {
      name: "Steady Scenario",
      description: "Business continues normal monthly performance.",
      riskLevel: application.riskLevel === "High" ? "Medium" : "Low",
      projectedDefaultRisk: baseRisk,
      impact: "+6%",
    },
    {
      name: "Stress Scenario",
      description: "Sales drop 25%, creating pressure on EMI capacity.",
      riskLevel: application.riskLevel === "Low" ? "Medium" : "High",
      projectedDefaultRisk: baseRisk + 12,
      impact: "-12%",
    },
  ];
}

/*
  Step 3: Recommend a safer loan amount.

  This is the Debt-Trap Shield logic.
  It compares the requested loan with sales capacity, twin score, and demo recommendation.
*/
export function recommendSafeLoan(
  application: LoanApplication,
  twin: FinancialTwinResult
): LoanRecommendation {
  const monthlySales = application.averageMonthlySales;

  const safeLoanBySales = monthlySales * 2.2;
  const safeLoanByScore = getScoreBasedLoanLimit(
    application.requestedLoan,
    twin.score
  );

  const safeLoan = roundToNearest50000(
    Math.min(application.recommendedLoan, safeLoanBySales, safeLoanByScore)
  );

  const riskyZone = roundToNearest50000(safeLoan * 1.25);
  const riskLevel = getRecommendationRiskLevel(
    safeLoan,
    application.requestedLoan
  );

  return {
    requestedLoan: application.requestedLoan,
    safeLoan,
    riskyZone,
    productType: application.productType,
    riskLevel,
    decisionSupport:
      "Decision-support only. Final approval must remain with the bank officer.",
    reason:
      "The requested loan is higher than the safe range under seasonal cashflow. A smaller working capital structure with monitoring is safer.",
  };
}

/*
  Step 4: Generate Dynamic EMI.

  The idea is simple:
  normal EMI for regular months, lower EMI during weak months,
  and higher EMI during strong sales months.
*/
export function generateDynamicEmiPlan(
  application: LoanApplication,
  recommendation: LoanRecommendation
): DynamicEmiPlan {
  const baseEmi = Math.round(recommendation.safeLoan / 50);

  const normalMonthEmi = roundToNearest500(baseEmi);
  const highSeasonEmi = roundToNearest500(baseEmi * 1.65);
  const lowSeasonEmi = roundToNearest500(baseEmi * 0.7);

  const emiToSales =
    normalMonthEmi / Math.max(application.averageMonthlySales, 1);

  const affordability =
    emiToSales < 0.05 ? "High" : emiToSales < 0.08 ? "Medium" : "Low";

  return {
    normalMonthEmi,
    highSeasonEmi,
    lowSeasonEmi,
    affordability,
    explanation:
      "The EMI plan follows business cashflow rhythm: lower during low season and higher during stronger sales months.",
  };
}

/*
  Step 5: Create a Rescue Before Default plan.

  This does not wait for a full default.
  It reacts to early warning signals and suggests a softer recovery action.
*/
export function createRescuePlan(application: LoanApplication): RescuePlan {
  const triggerSignals = [
    "Sales down 35%",
    "EMI delayed twice",
    "Supplier payment delayed",
  ];

  const distressLevel =
    application.riskLevel === "High" ? "High" : application.riskLevel;

  return {
    distressLevel,
    triggerSignals,
    customerAction: "Request temporary EMI support through the customer portal.",
    bankAction: "Offer a 4-month lower EMI plan with close monitoring.",
    avoidAction:
      "Avoid immediate legal notice while borrower is willing to cooperate.",
    recoveryProbability: application.riskLevel === "High" ? 68 : 76,
  };
}

/*
  Main orchestrator.

  This runs the full Amicus workflow in the same order the demo will show:
  Financial Twin → Future Mirror → Safe Loan → Dynamic EMI → Rescue Plan.
*/
export function runAmicusAnalysis(application: LoanApplication): AmicusAnalysis {
  const financialTwin = calculateFinancialTwin(application);
  const futureMirror = runFutureMirror(application);
  const recommendation = recommendSafeLoan(application, financialTwin);
  const dynamicEmi = generateDynamicEmiPlan(application, recommendation);
  const rescuePlan = createRescuePlan(application);

  return {
    financialTwin,
    futureMirror,
    recommendation,
    dynamicEmi,
    rescuePlan,
  };
}

/* Helper functions keep the main analysis logic easier to read. */

function hasSeasonality(seasonality: string): boolean {
  return seasonality.toLowerCase().includes("season");
}

function getTwinGrade(score: number): FinancialTwinResult["grade"] {
  if (score >= 800) return "Excellent";
  if (score >= 700) return "Good";
  if (score >= 600) return "Watch";
  return "Risky";
}

function getDebtStress(emiPressure: number): FinancialTwinResult["debtStress"] {
  if (emiPressure < 0.04) return "Low";
  if (emiPressure < 0.08) return "Medium";
  return "High";
}

function getEmergencyBuffer(
  application: LoanApplication
): FinancialTwinResult["emergencyBuffer"] {
  if (application.averageMonthlySales > application.existingEmi * 35) {
    return "Strong";
  }

  if (application.averageMonthlySales > application.existingEmi * 25) {
    return "Moderate";
  }

  return "Weak";
}

function getBaseDefaultRisk(riskLevel: LoanApplication["riskLevel"]): number {
  if (riskLevel === "High") return 18;
  if (riskLevel === "Medium") return 10;
  return 5;
}

function getScoreBasedLoanLimit(requestedLoan: number, score: number): number {
  if (score >= 780) return requestedLoan * 0.8;
  if (score >= 700) return requestedLoan * 0.65;
  return requestedLoan * 0.55;
}

function getRecommendationRiskLevel(
  safeLoan: number,
  requestedLoan: number
): LoanRecommendation["riskLevel"] {
  if (safeLoan < requestedLoan * 0.6) return "High";
  if (safeLoan < requestedLoan * 0.8) return "Medium";
  return "Low";
}

function roundToNearest50000(value: number): number {
  return Math.round(value / 50000) * 50000;
}

function roundToNearest500(value: number): number {
  return Math.round(value / 500) * 500;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}


