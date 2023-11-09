import crypto from "node:crypto";

export default function Bookschema(
  imageurl,
  bookname,
  bookquantity,
  ratings,
  authorname,
  category,
  shortdescription
) {
  this._id = crypto.randomBytes(15).toString("hex");
  this.imageurl = imageurl;
  this.bookname = bookname;
  this.bookquantity = Number(bookquantity);
  this.ratings = ratings;
  this.authorname = authorname;
  this.category = category;
  this.shortdescription = shortdescription;
  this.borrowed = [];
}
