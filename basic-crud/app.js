const express = require("express");
const app = express();

const userModel = require("./usermodel");

app.get("/", async (req, res) => {
  res.send("Welcome");
});

//create a new user
app.get("/create", async (req, res) => {
  let createUser = await userModel.create({
    name: "fahim",
    username: "fs-fahim",
    email: "fahim@gmail.com",
  });
  res.send(createUser);
});

// read
app.get("/read", async (req, res) => {
  const users = await userModel.find();
  res.send(users);
});

// update
app.get("/update", async (req, res) => {
  let updatedUser = await userModel.findOneAndUpdate(
    { username: "mh-monzil" },
    { name: "ozil" },
    { new: true }
  );
  res.send(updatedUser);
});

app.get("/delete", async (req, res) => {
  const users = await userModel.findOneAndDelete({ name: "ozil" });
  res.send(users);
});

app.listen(3000, console.log("Running!"));
