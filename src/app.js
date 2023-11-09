import express from "express";
import cors from "cors";
import router from "./router.js";

const app = express();
const port = 2932;
const msg = console.log(`server running at ${port}`);

app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(port, msg);
