import { client } from "../config.js";

export default async function finduser(email) {
  const connect = client;
  try {
    await connect.connect();
    const db = connect.db("assignment").collection("users");
    const data = await db.findOne({ email: email });
    return data;
  } catch (err) {
    throw err;
  } finally {
    if (connect) connect.close();
  }
}
