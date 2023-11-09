import updatebook from "../models/books.js";
import Bookupdateschema from "../schema/updatebook.js";

export default async function Updatebook(rq, rs) {
  const { image, bookname, ratings, authorname, category } = await rq.body;
  const { id } = rq.params;
  try {
    const schema = new Bookupdateschema(
      image,
      bookname,
      ratings,
      authorname,
      category
    );
    await updatebook(id, schema); // query to database
    rs.status(200).json({
      acknowledged: true,
      message: "book updated succesfully",
    });
  } catch (err) {
    rs.status(500).json({ acknowledged: false, message: err.message });
  }
}
