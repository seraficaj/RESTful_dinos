const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const fs = require("fs");

const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(ejsLayouts);

// Routes
app.get("/", (req, res) => {
    res.send(`Dinosaur party!`);
});

// Dinosaur index route
app.get("/dinosaurs", (req, res) => {
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    let dinoData = JSON.parse(dinosaurs);
    res.render("dinosaurs/index", { myDinos: dinoData });
});

app.listen(4000, () => {
    console.log(`Listening on Port:4000!`);
});
