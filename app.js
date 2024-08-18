const express = require("express");
const app = express();

const userModel = require("./usermodel");

app.get("/", async (req, res) => {
  res.send("Welcome");
});

//create a new user
app.get("/create", async (req, res) => {
  let createUser = await userModel.create({
    name: "monzil",
    username: "mh-monzil",
    email: "monzil@gmail.com",
  });
  res.send(createUser);
});

app.get("/update", async (req, res) => {
  let updatedUser = await userModel.findOneAndUpdate(
    { username: "mh-monzil" },
    { name: "ozil" },
    { new: true }
  );
  res.send(updatedUser);
});

app.listen(3000, console.log("Running!"));
