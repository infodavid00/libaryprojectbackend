import {
  getallbook,
  findbycategory,
  getallbookbyavailability,
} from "../models/books.js";

export async function getbooks(rq, rs) {
  const where = await rq.query.where;
  try {
    if (where !== "all") {
      const data = await findbycategory(where);
      rs.status(200).json({ acknowledged: true, data: data });
    } else {
      const data = await getallbook();
      if (data !== null) {
        rs.status(200).json({ acknowledged: true, data: data });
      } else {
        throw { message: "cannot complete request" };
      }
    }
  } catch (err) {
    rs.status(500).json({ acknowledged: false, message: err.message });
  }
}

export async function getallbooksbyavailability(rq, rs) {
  try {
    const data = await getallbookbyavailability();
    rs.status(200).json({ acknowledged: true, data: data });
  } catch (err) {
    rs.status(500).json({ acknowledged: false, message: err.message });
  }
}
