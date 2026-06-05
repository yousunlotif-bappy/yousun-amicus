import { demoApplications, getApplicationById } from "@/data/applications";
import { runAmicusAnalysis } from "@/lib/agent-calculations";
import { GeneratedReport, generateAllReports } from "@/lib/report-generator";

export const demoReports: GeneratedReport[] = demoApplications.flatMap(
  (application) => {
    const analysis = runAmicusAnalysis(application);
    return generateAllReports(application, analysis);
  }
);

export function getReportById(id: string) {
  return demoReports.find((report) => report.id === id);
}

export function getReportsByApplicationId(applicationId: string) {
  return demoReports.filter((report) => report.applicationId === applicationId);
}

export function getReportContext(reportId: string) {
  const report = getReportById(reportId);

  if (!report) {
    return null;
  }

  const application = getApplicationById(report.applicationId);

  if (!application) {
    return null;
  }

  return {
    report,
    application,
  };
}


