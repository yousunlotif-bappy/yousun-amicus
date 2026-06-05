/*
  Demo loan application data for YOUSUN Amicus.

  For now, this file works as our temporary database.
  Later, these records will come from MongoDB through backend APIs.
*/

export type RiskLevel = "Low" | "Medium" | "High";

export type ApplicationStatus =
  | "AI Review Pending"
  | "Under Review"
  | "Approved"
  | "Rejected";

export type LoanApplication = {
  id: string;
  businessName: string;
  ownerName: string;
  businessType: string;
  location: string;

  requestedLoan: number;
  recommendedLoan: number;
  existingEmi: number;
  averageMonthlySales: number;

  riskLevel: RiskLevel;
  status: ApplicationStatus;
  productType: string;
  seasonality: string;

  twinScore: number;
  businessHealth: number;
  approvalReadiness: number;

  documents: string[];
  createdAt: string;
};

/*
  Main demo applications.
  APP-001 is the primary case for the hackathon demo:
  Rahim Fashion House asks for BDT 15 lakh, but Amicus recommends BDT 9 lakh
  to reduce debt pressure and protect the borrower before default.
*/
export const demoApplications: LoanApplication[] = [
  {
    id: "APP-001",
    businessName: "Rahim Fashion House",
    ownerName: "Md. Rahim Uddin",
    businessType: "Retail Apparel",
    location: "Dhaka, Bangladesh",
    requestedLoan: 1500000,
    recommendedLoan: 900000,
    existingEmi: 12000,
    averageMonthlySales: 420000,
    riskLevel: "Medium",
    status: "AI Review Pending",
    productType: "Working Capital Bridge",
    seasonality: "High sales during Eid, lower sales after season",
    twinScore: 736,
    businessHealth: 82,
    approvalReadiness: 72,
    documents: ["Trade License", "Bank Statement", "Supplier Invoice"],
    createdAt: "2026-06-05",
  },
  {
    id: "APP-002",
    businessName: "M/S Shuvo Traders",
    ownerName: "Shuvo Ahmed",
    businessType: "Wholesale Trading",
    location: "Chattogram, Bangladesh",
    requestedLoan: 800000,
    recommendedLoan: 650000,
    existingEmi: 8000,
    averageMonthlySales: 310000,
    riskLevel: "Low",
    status: "Under Review",
    productType: "Short-Term Working Capital",
    seasonality: "Stable monthly sales with supplier cycle dependency",
    twinScore: 768,
    businessHealth: 86,
    approvalReadiness: 78,
    documents: ["Trade License", "Bank Statement"],
    createdAt: "2026-06-04",
  },
  {
    id: "APP-003",
    businessName: "Aminul Electronics",
    ownerName: "Aminul Islam",
    businessType: "Electronics Retail",
    location: "Rajshahi, Bangladesh",
    requestedLoan: 2000000,
    recommendedLoan: 1200000,
    existingEmi: 24000,
    averageMonthlySales: 520000,
    riskLevel: "High",
    status: "AI Review Pending",
    productType: "Inventory Finance",
    seasonality: "Sales spike during festivals, high inventory pressure",
    twinScore: 612,
    businessHealth: 69,
    approvalReadiness: 58,
    documents: ["Trade License", "Bank Statement", "Inventory List"],
    createdAt: "2026-06-03",
  },
  {
    id: "APP-004",
    businessName: "Green Agro Farm",
    ownerName: "Fahim Hasan",
    businessType: "Agri Business",
    location: "Gazipur, Bangladesh",
    requestedLoan: 1200000,
    recommendedLoan: 1000000,
    existingEmi: 6000,
    averageMonthlySales: 360000,
    riskLevel: "Low",
    status: "Approved",
    productType: "Seasonal Agriculture Loan",
    seasonality: "Harvest season cashflow is strong",
    twinScore: 790,
    businessHealth: 88,
    approvalReadiness: 83,
    documents: ["Trade License", "Bank Statement", "Land Lease"],
    createdAt: "2026-06-02",
  },
];

/*
  Find one application by ID.
  This will be useful for application details pages like /applications/APP-001.
*/
export function getApplicationById(id: string): LoanApplication | undefined {
  return demoApplications.find((application) => application.id === id);
}

/*
  Format Bangladeshi Taka nicely for the UI.
  Example: 1500000 -> BDT 15,00,000
*/
export function formatBDT(amount: number): string {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);
}

