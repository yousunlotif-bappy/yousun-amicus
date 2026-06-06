import { config } from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

import { demoApplications } from "../src/data/applications";
import { runAmicusAnalysis } from "../src/lib/agent-calculations";
import { generateAllReports } from "../src/lib/report-generator";

/*
  Seed script for YOUSUN Amicus.

  This script uploads demo applications, agent analyses, and reports into MongoDB.
  Run it whenever you want to reset the demo database.
*/

config({ path: ".env.local" });

async function main() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || "yousun_amicus";

  if (!uri) {
    throw new Error("Missing MONGODB_URI in .env.local");
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();

    const db = client.db(dbName);

    /*
      Clean old demo data first.
      This keeps the database fresh every time we run the seed command.
    */
    await db.collection("loan_applications").deleteMany({});
    await db.collection("agent_analyses").deleteMany({});
    await db.collection("reports").deleteMany({});

    /*
      Insert loan applications.
    */
    await db.collection("loan_applications").insertMany(demoApplications);

    /*
      Generate and insert Amicus agent analyses.
    */
    const analyses = demoApplications.map((application) => ({
      applicationId: application.id,
      analysis: runAmicusAnalysis(application),
      createdAt: new Date().toISOString(),
      generatedBy: "YOUSUN Amicus Agent",
    }));

    await db.collection("agent_analyses").insertMany(analyses);

    /*
      Generate and insert all reports.
      Each application gets:
      1. Bank Officer Memo
      2. Customer Summary
      3. Rescue Report
    */
    const reports = demoApplications.flatMap((application) => {
      const analysis = runAmicusAnalysis(application);

      return generateAllReports(application, analysis);
    });

    await db.collection("reports").insertMany(reports);

    console.log("✅ Seed completed successfully");
    console.log(`Database: ${dbName}`);
    console.log(`Applications: ${demoApplications.length}`);
    console.log(`Analyses: ${analyses.length}`);
    console.log(`Reports: ${reports.length}`);
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error("❌ Seed failed");
  console.error(error);
  process.exit(1);
});


