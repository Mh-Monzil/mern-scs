const express = require('express');
const app = express();

const userModel = require('./usermodel')

app.get('/', async (req, res) => {
    res.send("Welcome")
})

app.get('/create', async (req, res) => {
    let createUser = await userModel.create({
        name: "monzil",
        username: "mh-monzil",
        email: "monzil@gmail.com"
    })
    res.send(createUser)
})

app.listen(3000, console.log("Running!"))