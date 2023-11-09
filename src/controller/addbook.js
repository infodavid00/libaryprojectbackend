import addbook from "../models/addbook.js";
import Bookschema from "../schema/book.js";

export default async function Addbook(rq, rs) {
  const {
    image,
    bookname,
    bookquantity,
    ratings,
    authorname,
    category,
    shortdescription,
  } = await rq.body;
  try {
    const schema = new Bookschema(
      image,
      bookname,
      bookquantity,
      ratings,
      authorname,
      category,
      shortdescription
    );
    await addbook(schema); // query to database
    rs.status(200).json({
      acknowledged: true,
      message: "book created succesfully",
    });
  } catch (err) {
    rs.status(500).json({ acknowledged: false, message: err.message });
  }
}
