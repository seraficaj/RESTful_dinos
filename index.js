const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const fs = require("fs");

const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(ejsLayouts);
//body-parser middleware
// allows access to form data via req.body
app.use(express.urlencoded({ extended: false }));

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

app.get("/dinosaurs/new", (req, res) => {
    res.render("dinosaurs/new");
});

app.post("/dinosaurs", (req, res) => {
    // read dinosaurs file
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    let dinoData = JSON.parse(dinosaurs);

    // add item to dinosaurs array
    dinoData.push(req.body);

    // save dinosaurs to the data.json file
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));

    //redirect to the GET /dinosaurs route (index)
    res.redirect("/dinosaurs");
});

app.get("/dinosaurs/:idx", (req, res) => {
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    let dinoData = JSON.parse(dinosaurs);
    let dinoIndex = parseInt(req.params.idx);
    res.render("dinosaurs/show", { myDino: dinoData[dinoIndex] });
});

app.listen(4000, () => {
    console.log(`Listening on Port:4000!`);
});
