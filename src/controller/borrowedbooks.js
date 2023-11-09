import jwt from "jsonwebtoken";
import { token } from "../config.js";
import { getborowedbooks } from "../models/books.js";

export default async function borrowedbook(rq, rs) {
  const { accesstoken } = await rq.params;
  try {
    const jsontoken = jwt.verify(accesstoken, token);
    const { sub } = jsontoken;
    const data = await getborowedbooks(sub);
    if (data) {
      console.log(data); // Corrected typo (change "consoe" to "console")
      rs.status(200).json({ acknowledged: true, data: data });
    } else {
      throw { message: "no data to fetch" };
    }
  } catch (err) {
    rs.status(500).json({ acknowledged: false, message: err.message });
  }
}
