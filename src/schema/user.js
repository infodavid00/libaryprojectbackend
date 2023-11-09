import crypto from "node:crypto";

export default function Userschema(email, username, password) {
  this._id = crypto.randomBytes(10).toString("hex");
  this.email = email;
  this.username = username;
  this.password = password;
}
