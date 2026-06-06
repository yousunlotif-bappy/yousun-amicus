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
  riskLevel: "Low" | "Medium" | "High";
  status: "AI Review Pending" | "Under Review" | "Approved" | "Rejected";
  productType: string;
  seasonality: string;
  twinScore: number;
  businessHealth: number;
  approvalReadiness: number;
  documents: string[];
  createdAt: string;

  /*
    Optional fields for Step 14 customer/bank submission flow.
    Old demo applications will still work even if these fields are missing.
  */
  submittedBy?: "bank_officer" | "customer";
  customerEmail?: string;
  loanPurpose?: string;
};

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
    submittedBy: "bank_officer",
    customerEmail: "rahim@example.com",
    loanPurpose: "Inventory purchase before seasonal sales period",
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
    submittedBy: "bank_officer",
    customerEmail: "shuvo@example.com",
    loanPurpose: "Supplier payment and short-term working capital support",
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
    submittedBy: "bank_officer",
    customerEmail: "aminul@example.com",
    loanPurpose: "Electronics inventory financing for festival demand",
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
    submittedBy: "bank_officer",
    customerEmail: "fahim@example.com",
    loanPurpose: "Seasonal agriculture input and harvest cycle support",
  },
];

export function getApplicationById(id: string) {
  return demoApplications.find((application) => application.id === id);
}

export function formatBDT(amount: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);
}

