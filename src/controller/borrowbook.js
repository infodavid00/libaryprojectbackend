import jwt from "jsonwebtoken";
import { token } from "../config.js";
import { borrowbook } from "../models/books.js";

export default async function borrowBook(rq, rs) {
  const { accesstoken, id } = await rq.params;
  const { name, email, date } = await rq.body;
  try {
    const jsontoken = jwt.verify(accesstoken, token);
    const { sub } = jsontoken;
    const data = await borrowbook(id, { sub, name, email, date });
    rs.status(200).json({ acknowledged: true, data: data });
  } catch (err) {
    rs.status(500).json({ acknowledged: false, message: err.message });
  }
}
