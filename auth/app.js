const express = require("express");
const app = express();
const userModel = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");
const path = require("path");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  const { username, email, password, age } = req.body;

  //hash
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const createdUser = await userModel.create({
        username,
        email,
        password: hash,
        age,
      });

      const token = jwt.sign({ email }, "secret");
      res.cookie("secret-token", token);
      res.send(createdUser);
    });
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.send("something is wrong");

  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (result) {
        let token = jwt.sign({ email: user.email }, "secret");
      res.cookie("secret-token", token);
      res.send("yes you can login");
    } 
    else res.send("no you can't login");
  });

  //   res.render("login");
});

//logout
app.get("/logout", (req, res) => {
  res.cookie("secret-token", "");
  res.redirect("/");
});

app.listen(3000);
