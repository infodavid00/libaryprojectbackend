import express from "express";
import Signup from "./controller/Signup.js";
import Signin from "./controller/Signin.js";
import Getprofile from "./controller/Getprofile.js";
import Addbook from "./controller/addbook.js";
import { getbooks, getallbooksbyavailability } from "./controller/getbooks.js";
import Updatebook from "./controller/updatebook.js";
import { getbyid } from "./controller/getbookbyid.js";
import borrowBook from "./controller/borrowbook.js";
import borrowedbook from "./controller/borrowedbooks.js";
import returnbooks from "./controller/return.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/signin", Signin);
router.get("/user/:accesstoken", Getprofile);

router.post("/addbook", Addbook);
router.post("/updatebook/:id", Updatebook);
router.post("/borrowbook/:accesstoken/:id", borrowBook); // boody: name, email, date
router.post("/return/:accesstoken/:id", returnbooks); // boody: name, email, date

router.get("/books", getbooks); //?where=value
router.get("/books/byid/:id", getbyid);
router.get("/books/byavail", getallbooksbyavailability);
router.get("/books/borrowedbooks/:accesstoken", borrowedbook);

export default router;
