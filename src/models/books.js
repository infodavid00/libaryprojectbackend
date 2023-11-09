import { client } from "../config.js";

export async function getallbook() {
  const connect = client;
  try {
    await connect.connect();
    const db = connect.db("assignment").collection("books");
    const data = await db.find().toArray();
    return data;
  } catch (err) {
    throw err;
  } finally {
    if (connect) connect.close();
  }
}
export async function getallbookbyavailability() {
  const connect = client;
  try {
    await connect.connect();
    const db = connect.db("assignment").collection("books");
    const data = await db
      .find({
        bookquantity: {
          $gt: 0,
        },
      })
      .toArray();
    return data;
  } catch (err) {
    throw err;
  } finally {
    if (connect) connect.close();
  }
}

export async function findbycategory(category) {
  const connect = client;
  try {
    await connect.connect();
    const db = connect.db("assignment").collection("books");
    const data = await db.find({ category: category }).toArray();
    return data;
  } catch (err) {
    throw err;
  } finally {
    if (connect) connect.close();
  }
}

export async function getbookbyid(id) {
  const connect = client;
  try {
    await connect.connect();
    const db = connect.db("assignment").collection("books");
    const data = await db.findOne({ _id: id });
    return data;
  } catch (err) {
    throw err;
  } finally {
    if (connect) connect.close();
  }
}

export async function getborowedbooks(id) {
  const connect = client;
  try {
    await connect.connect();
    const db = connect.db("assignment").collection("books");

    // Ensure id is an array before using map
    const idArray = Array.isArray(id) ? id.map((obj) => obj.sub) : [id];

    const data = await db.find({ "borrowed.sub": { $in: idArray } }).toArray();

    return data;
  } catch (err) {
    throw err;
  } finally {
    if (connect) connect.close();
  }
}

export async function searchbook(name) {
  const connect = client;
  try {
    await connect.connect();
    const db = connect.db("assignment").collection("books");
    const data = await db.findOne({ bookname: name });
    return data;
  } catch (err) {
    throw err;
  } finally {
    if (connect) connect.close();
  }
}

export default async function updatebook(id, data) {
  const connect = client;
  try {
    await connect.connect();
    const db = connect.db("assignment").collection("books");
    await db.updateOne({ _id: id }, { $set: data });
    return true;
  } catch (err) {
    throw err;
  } finally {
    if (connect) connect.close();
  }
}
export async function borrowbook(id, data) {
  const connect = client;
  try {
    await connect.connect();
    const db = connect.db("assignment").collection("books");

    const result = await db.updateOne(
      { _id: id, bookquantity: { $gt: 0 } }, // Check if there are available books
      {
        $push: { borrowed: data },
        $inc: { bookquantity: -1 }, // Decrement bookquantity
      }
    );

    if (result.modifiedCount === 1) {
      return true; // Successfully borrowed
    } else {
      return false; // No available books or an error occurred
    }
  } catch (err) {
    throw err;
  } finally {
    if (connect) connect.close();
  }
}

export async function returnbook(id, sub) {
  const connect = client;
  try {
    await connect.connect();
    const db = connect.db("assignment").collection("books");
    await db.updateOne(
      { _id: id },
      {
        $pull: { borrowed: { sub: sub } },
        $inc: { bookquantity: 1 },
      }
    );
    return true;
  } catch (err) {
    throw err;
  } finally {
    if (connect) connect.close();
  }
}
