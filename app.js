import express from "express";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import { json, urlencoded } from "express";
import userModel from "./models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public  ")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  let { name, email, password, age } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const createdUser = await userModel.create({
        name,
        email,
        password: hash,
        age,
      });
      ;let token =jwt.sign({email},"secret")
      res.cookie("token",token)
      res.send(createdUser);
    });
  });

  
});

app.get('/logout',(req,res)=>{
  res.clearCookie("token")
  res.redirect("/")
})

app.get('/login',(req,res)=>{
  res.render("login")
})

app.post('/login',async(req,res)=>{
    let user = await userModel.findOne({email:req.body.email})
    if(!user){
        res.send("Something went wrong")
    }
    bcrypt.compare(req.body.password,user.password,(err,result)=>{
        if(result){
            let token =jwt.sign({email:user.email},"secret")
            res.cookie("token",token)
            res.send("login success")
        }

    })
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
