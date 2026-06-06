import {
  demoApplications,
  getApplicationById,
  type LoanApplication,
} from "@/data/applications";
import { runAmicusAnalysis } from "@/lib/agent-calculations";
import {
  generateAllReports,
  type GeneratedReport,
} from "@/lib/report-generator";

/*
  Demo reports data for YOUSUN Amicus.

  For now, reports are generated from our local demo applications.
  Later, the same report structure will be saved and read from MongoDB.
*/

/*
  This type is used by db-reports.ts.
  Keeping it exported makes MongoDB repository typing clean and safe.
*/
export type DemoReport = GeneratedReport;

export type ReportContext = {
  report: DemoReport;
  application: LoanApplication;
};

/*
  Generate all demo reports from demo applications.

  Each application creates:
  1. Bank Officer Memo
  2. Customer Summary
  3. Rescue Before Default Report
*/
export const demoReports: DemoReport[] = demoApplications.flatMap(
  (application) => {
    const analysis = runAmicusAnalysis(application);

    return generateAllReports(application, analysis);
  }
);

/*
  Find one report by report ID.
  Example: RPT-BANK-APP-001
*/
export function getReportById(id: string): DemoReport | undefined {
  return demoReports.find((report) => report.id === id);
}

/*
  Find all reports connected to one application.
  Example: APP-001 should return 3 reports.
*/
export function getReportsByApplicationId(
  applicationId: string
): DemoReport[] {
  return demoReports.filter((report) => report.applicationId === applicationId);
}

/*
  Report detail pages need both:
  - report data
  - related loan application data

  This helper returns both together for local demo fallback.
*/
export function getReportContext(id: string): ReportContext | undefined {
  const report = getReportById(id);

  if (!report) {
    return undefined;
  }

  const application = getApplicationById(report.applicationId);

  if (!application) {
    return undefined;
  }

  return {
    report,
    application,
  };
}


