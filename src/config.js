import { MongoClient, ServerApiVersion } from "mongodb";

export const client = new MongoClient(
  "mongodb+srv://da40au40:david@ysa.5cmm2yt.mongodb.net/?retryWrites=true&w=majority",
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);
export const token = "7050f1aa7cb568caa304";
