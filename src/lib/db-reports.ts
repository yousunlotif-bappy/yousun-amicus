import type { ObjectId } from "mongodb";

import {
  demoReports,
  getReportById,
  type DemoReport,
} from "@/data/reports";
import { getDb } from "@/lib/mongodb";

/*
  Database repository for generated reports.

  Reports are stored in MongoDB after seeding.
  If MongoDB is not available, the app still works using local demo reports.
*/

const COLLECTION_NAME = "reports";

type ReportDocument = DemoReport & {
  _id?: ObjectId;
};

export async function getAllReportsFromDb(): Promise<DemoReport[]> {
  try {
    const db = await getDb();

    const reports = await db
      .collection<ReportDocument>(COLLECTION_NAME)
      .find({})
      .sort({ generatedAt: -1 })
      .toArray();

    if (!reports.length) {
      return demoReports;
    }

    return reports.map(removeMongoId);
  } catch (error) {
    console.error("Failed to read reports from MongoDB:", error);

    return demoReports;
  }
}

export async function getReportByIdFromDb(
  id: string
): Promise<DemoReport | undefined> {
  try {
    const db = await getDb();

    const report = await db
      .collection<ReportDocument>(COLLECTION_NAME)
      .findOne({ id });

    if (!report) {
      return getReportById(id);
    }

    return removeMongoId(report);
  } catch (error) {
    console.error(`Failed to read report ${id} from MongoDB:`, error);

    return getReportById(id);
  }
}

export async function getReportsByApplicationIdFromDb(
  applicationId: string
): Promise<DemoReport[]> {
  try {
    const db = await getDb();

    const reports = await db
      .collection<ReportDocument>(COLLECTION_NAME)
      .find({ applicationId })
      .toArray();

    if (!reports.length) {
      return demoReports.filter(
        (report) => report.applicationId === applicationId
      );
    }

    return reports.map(removeMongoId);
  } catch (error) {
    console.error(
      `Failed to read reports for application ${applicationId}:`,
      error
    );

    return demoReports.filter(
      (report) => report.applicationId === applicationId
    );
  }
}

function removeMongoId(report: ReportDocument): DemoReport {
  const { _id, ...cleanReport } = report;

  return cleanReport;
}


