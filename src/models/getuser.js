import { client } from "../config.js";

export default async function getuser(sub) {
  const connect = client;
  try {
    await connect.connect();
    const db = connect.db("assignment").collection("users");
    const data = await db.findOne(
      { _id: sub },
      {
        projection: {
          password: 0,
        },
      }
    );
    return data;
  } catch (err) {
    throw err;
  } finally {
    if (connect) connect.close();
  }
}
