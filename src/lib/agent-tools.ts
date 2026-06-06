import { getApplicationByIdFromDb, getAllApplicationsFromDb } from "@/lib/db-applications";
import {
  getReportByIdFromDb,
  getReportsByApplicationIdFromDb,
} from "@/lib/db-reports";
import { runAmicusAnalysis } from "@/lib/agent-calculations";
import { generateAllReports } from "@/lib/report-generator";
import { getDb } from "@/lib/mongodb";

export async function listLoanApplicationsTool() {
  const applications = await getAllApplicationsFromDb();

  return {
    tool: "listLoanApplications",
    success: true,
    data: applications,
  };
}

export async function getLoanApplicationTool(applicationId: string) {
  const application = await getApplicationByIdFromDb(applicationId);

  return {
    tool: "getLoanApplication",
    success: Boolean(application),
    data: application,
  };
}

export async function runLoanReviewAgentTool(applicationId: string) {
  const application = await getApplicationByIdFromDb(applicationId);

  if (!application) {
    return {
      tool: "runLoanReviewAgent",
      success: false,
      message: "Application not found",
    };
  }

  const analysis = runAmicusAnalysis(application);
  const reports = generateAllReports(application, analysis);

  try {
    const db = await getDb();

    await db.collection("agent_analyses").updateOne(
      { applicationId },
      {
        $set: {
          applicationId,
          analysis,
          updatedAt: new Date().toISOString(),
          generatedBy: "YOUSUN Amicus Agent",
        },
      },
      { upsert: true }
    );

    for (const report of reports) {
      await db.collection("reports").updateOne(
        { id: report.id },
        {
          $set: report,
        },
        { upsert: true }
      );
    }
  } catch (error) {
    console.error("Failed to save agent analysis:", error);
  }

  return {
    tool: "runLoanReviewAgent",
    success: true,
    data: {
      application,
      analysis,
      reports,
    },
  };
}

export async function getReportsByApplicationTool(applicationId: string) {
  const reports = await getReportsByApplicationIdFromDb(applicationId);

  return {
    tool: "getReportsByApplication",
    success: true,
    data: reports,
  };
}

export async function getReportTool(reportId: string) {
  const report = await getReportByIdFromDb(reportId);

  return {
    tool: "getReport",
    success: Boolean(report),
    data: report,
  };
}

export async function createRescuePlanTool(applicationId: string) {
  const application = await getApplicationByIdFromDb(applicationId);

  if (!application) {
    return {
      tool: "createRescuePlan",
      success: false,
      message: "Application not found",
    };
  }

  const analysis = runAmicusAnalysis(application);

  try {
    const db = await getDb();

    await db.collection("rescue_plans").updateOne(
      { applicationId },
      {
        $set: {
          applicationId,
          rescuePlan: analysis.rescuePlan,
          createdAt: new Date().toISOString(),
          generatedBy: "YOUSUN Amicus Agent",
        },
      },
      { upsert: true }
    );
  } catch (error) {
    console.error("Failed to save rescue plan:", error);
  }

  return {
    tool: "createRescuePlan",
    success: true,
    data: analysis.rescuePlan,
  };
}

