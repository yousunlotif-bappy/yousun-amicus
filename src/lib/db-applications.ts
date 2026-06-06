import type { ObjectId } from "mongodb";

import {
  demoApplications,
  getApplicationById,
  type LoanApplication,
} from "@/data/applications";
import { getDb } from "@/lib/mongodb";

/*
  Database repository for loan applications.

  The UI will call these functions instead of directly reading demoApplications.
  If MongoDB fails, we safely fall back to local demo data.
*/

const COLLECTION_NAME = "loan_applications";

type LoanApplicationDocument = LoanApplication & {
  _id?: ObjectId;
};

export async function getAllApplicationsFromDb(): Promise<LoanApplication[]> {
  try {
    const db = await getDb();

    const applications = await db
      .collection<LoanApplicationDocument>(COLLECTION_NAME)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    if (!applications.length) {
      return demoApplications;
    }

    return applications.map(removeMongoId);
  } catch (error) {
    console.error("Failed to read applications from MongoDB:", error);

    return demoApplications;
  }
}

export async function getApplicationByIdFromDb(
  id: string
): Promise<LoanApplication | undefined> {
  try {
    const db = await getDb();

    const application = await db
      .collection<LoanApplicationDocument>(COLLECTION_NAME)
      .findOne({ id });

    if (!application) {
      return getApplicationById(id);
    }

    return removeMongoId(application);
  } catch (error) {
    console.error(`Failed to read application ${id} from MongoDB:`, error);

    return getApplicationById(id);
  }
}

function removeMongoId(application: LoanApplicationDocument): LoanApplication {
  const { _id, ...cleanApplication } = application;

  return cleanApplication;
}


