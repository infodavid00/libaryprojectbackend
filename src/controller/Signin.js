import finduser from "../models/finduser.js";
import jwt from "jsonwebtoken";
import { token } from "../config.js";

export default async function Signin(rq, rs) {
  const { email, password } = await rq.body;
  try {
    const data = await finduser(email); // query to database
    if (data !== null) {
      if (data.password === password) {
        const payload = { sub: data._id };
        const accesstoken = jwt.sign(payload, token, { expiresIn: "1d" });
        rs.status(200).json({ acknowledged: true, token: accesstoken });
      } else {
        rs.status(401).json({
          acknowledged: false,
          message: "incorrect password",
        });
      }
    } else {
      rs.status(404).json({
        acknowledged: false,
        message: "user does not exist",
      });
    }
  } catch (err) {
    rs.status(500).json({ acknowledged: false, message: err.message });
  }
}
