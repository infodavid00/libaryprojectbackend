import { searchbook } from "../models/books.js";

export async function searchbooks(rq, rs) {
  const { name } = await rq.params;
  try {
    const data = await searchbook(name);
    rs.status(200).json({ acknowledged: true, data: data });
  } catch (err) {
    rs.status(500).json({ acknowledged: false, message: err.message });
  }
}
