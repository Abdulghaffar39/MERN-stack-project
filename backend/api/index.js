import dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";

import dbCon from "../db/db.connection.js";
import router from "../Router/route.js";
import routeTwo from "../Router/routeTwo.js";
import routeJob from "../Router/routeJob.js";

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

dbCon();

app.use("/api", router);
app.use("/api", routeTwo);
app.use("/api", routeJob);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

export default app;
