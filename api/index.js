const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();

const bcryptSalt = bcrypt.genSaltSync(12);
const jwtSecret = "w490nrcy948rywn984hnihuwyrdouoojfhw9fu9axf";
app.use(cookieParser());

app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

mongoose.connect(process.env.MONGO_URL);
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        const tokkn = {
          httpOnly: true,
          SameSite: "none",
          expires: new Date(Date.now() + 1500 * 1000 * 60),
        };

        const pp = jwt.sign(
          { name: userDoc.name, email: userDoc.email, id: userDoc._id },
          jwtSecret
        );
        res.cookie("token", pp, tokkn).json(userDoc);
      } else {
        res.json("wrong password");
      }
    } else {
      res.status(422).json("user not found");
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

app.post("/register", async (req, res) => {
  const { uname, email, password } = req.body;
  // console.log(uname, email, password);

  try {
    const userDoc = await User.create({
      name: uname,
      email: email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    console.log(userDoc);
    res.json(userDoc);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  // const token =    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaGFyc2gyIiwiZW1haWwiOiJhZG1pbjJAZ21haWwuY29tIiwiaWQiOiI2NDRhMWEzZDJkYmQ2ZDA3ZGM2NzY1MGIiLCJpYXQiOjE2ODI2MDY2Mzd9.1Y80LxL36ibn0dI6abYHe_5lCpSvZw1bL9KoiPkduyU";
  if (!token) {
    res.status(401).json("not logged in");
  } else {
    jwt.verify(token, jwtSecret, {}, (err, decoded) => {
      if (err) throw err;

      res.json(decoded);
    });
  }
  console.log(req.cookies);
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo-" + Date.now() + ".jpg";
  try {
     await imageDownloader.image({
       url: link,
       dest: __dirname + "/uploads/" + newName,
     });
     res.json(newName);
  } catch (error) {
    res.json("error")
  }
 
});

const photoMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photoMiddleware.array("photos", 100), async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace('uploads/', ''));
  }
  res.json(uploadedFiles);
});

app.listen(4000);
