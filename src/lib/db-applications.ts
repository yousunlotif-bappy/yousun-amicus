import type { ObjectId } from "mongodb";

import {
  demoApplications,
  getApplicationById,
  type LoanApplication,
} from "@/data/applications";
import { getDb } from "@/lib/mongodb";

/*
  Database repository for loan applications.

  This file is the single place where the app reads/writes loan application data.
  If MongoDB fails while reading, the app falls back to local demo data so the
  demo does not break.
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

/*
  Create a new loan application in MongoDB.

  This will be used by:
  - Bank officer new application form
  - Customer portal application submission form
*/
export async function createApplicationInDb(
  application: LoanApplication
): Promise<LoanApplication> {
  const db = await getDb();

  await db
    .collection<LoanApplicationDocument>(COLLECTION_NAME)
    .insertOne(application);

  return application;
}

/*
  Generate the next application ID.

  Example:
  Current max: APP-004
  Next ID: APP-005

  If something goes wrong, we return a timestamp-based ID so submission
  still does not completely fail.
*/
export async function getNextApplicationId(): Promise<string> {
  try {
    const applications = await getAllApplicationsFromDb();

    const maxNumber = applications.reduce((max, application) => {
      const numberPart = Number(application.id.replace("APP-", ""));

      return Number.isFinite(numberPart) && numberPart > max
        ? numberPart
        : max;
    }, 0);

    const nextNumber = maxNumber + 1;

    return `APP-${String(nextNumber).padStart(3, "0")}`;
  } catch (error) {
    console.error("Failed to generate next application ID:", error);

    return `APP-${Date.now()}`;
  }
}

function removeMongoId(application: LoanApplicationDocument): LoanApplication {
  const { _id, ...cleanApplication } = application;

  return cleanApplication;
}

