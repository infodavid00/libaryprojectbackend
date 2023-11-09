import jwt from "jsonwebtoken";
import { token } from "../config.js";
import getuser from "../models/getuser.js";

export default async function Getprofile(rq, rs) {
  const { accesstoken } = await rq.params;
  try {
    const jsontoken = jwt.verify(accesstoken, token);
    const { sub } = jsontoken;
    const data = await getuser(sub);
    rs.status(200).json({ acknowledged: true, data: data });
  } catch (err) {
    rs.status(500).json({ acknowledged: false, message: err.message });
  }
}
