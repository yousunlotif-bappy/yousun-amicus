import { MongoClient, ServerApiVersion } from "mongodb";

/*
  MongoDB connection helper for YOUSUN Amicus.

  This file creates one reusable MongoDB connection.
  In development mode, we reuse the same connection so Next.js hot reload
  does not open too many database connections.
*/

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MONGODB_URI. Please add it to your .env.local file.");
}

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // Reuse MongoDB client during local development.
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }

  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getMongoClient(): Promise<MongoClient> {
  return clientPromise;
}

export async function getDb() {
  const mongoClient = await getMongoClient();

  return mongoClient.db(process.env.MONGODB_DB || "yousun_amicus");
}


