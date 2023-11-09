import queryuser from "../models/user.js";
import Userschema from "../schema/user.js";
import jwt from "jsonwebtoken";
import { token } from "../config.js";

export default async function Signup(rq, rs) {
  const { username, email, password } = await rq.body;
  try {
    const schema = new Userschema(email, username, password);
    await queryuser(schema); // query to database
    const payload = { sub: schema._id };
    const accesstoken = jwt.sign(payload, token, { expiresIn: "1d" });
    rs.status(200).json({ acknowledged: true, token: accesstoken });
  } catch (err) {
    rs.status(500).json({ acknowledged: false, message: err.message });
  }
}
