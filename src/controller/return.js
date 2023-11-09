import jwt from "jsonwebtoken";
import { token } from "../config.js";
import { returnbook } from "../models/books.js";

export default async function returnbooks(rq, rs) {
  const { accesstoken, id } = await rq.params;
  try {
    const jsontoken = jwt.verify(accesstoken, token);
    const { sub } = jsontoken;
    const data = await returnbook(id, sub);
    rs.status(200).json({ acknowledged: true, data: data });
  } catch (err) {
    rs.status(500).json({ acknowledged: false, message: err.message });
  }
}
