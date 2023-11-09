import { client } from "../config.js";

export default async function addbook(data) {
  const connect = client;
  try {
    await connect.connect();
    const db = connect.db("assignment").collection("books");
    await db.insertOne(data);
    return true;
  } catch (err) {
    throw err;
  } finally {
    if (connect) connect.close();
  }
}
