import { getbookbyid } from "../models/books.js";

export async function getbyid(rq, rs) {
  const { id } = await rq.params;
  try {
    const data = await getbookbyid(id);
    rs.status(200).json({ acknowledged: true, data: data });
  } catch (err) {
    rs.status(500).json({ acknowledged: false, message: err.message });
  }
}
