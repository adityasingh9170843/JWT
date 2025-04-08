import express from "express";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import { json, urlencoded } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public  ")));
app.set("view engine", "ejs");





app.get("/", (req, res) => {
    res.render("index");
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});