const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const fs = require("fs");

const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(ejsLayouts);
//body-parser middleware
// allows access to form data via req.body
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// Routes
app.get("/", (req, res) => {
    res.send(`Dinosaur party!`);
});

// Dinosaur index route
app.get("/dinosaurs", (req, res) => {
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    let dinoData = JSON.parse(dinosaurs);
    let nameFilter = req.query.nameFilter;

    if (nameFilter) {
        dinoData = dinoData.filter((dino) => {
            return dino.name.toLowerCase() === nameFilter.toLowerCase();
        });
    }

    res.render("dinosaurs/index", { myDinos: dinoData });
});

app.get("/dinosaurs/new", (req, res) => {
    res.render("dinosaurs/new");
});

app.get("/dinosaurs/edit/:idx", (req, res) => {
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    let dinoData = JSON.parse(dinosaurs);
    let dinoIndex = parseInt(req.params.idx);
    res.render("dinosaurs/edit", { dino: dinoData[dinoIndex], dinoId: dinoIndex });
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

app.put("/dinosaurs/:idx", (req, res) => {
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    let dinoData = JSON.parse(dinosaurs);

    //re-assign the name and type fields of the dinosaur to be editted
    dinoData[req.params.idx].name = req.body.name;
    dinoData[req.params.idx].type = req.body.type;

    // save the editted dinosaurs to the data.json file
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));
    res.redirect("/dinosaurs");
});

app.delete("/dinosaurs/:idx", (req, res) => {
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    let dinoData = JSON.parse(dinosaurs);

    // remove the deleted dinosaur from the dinosaurs array
    dinoData.splice(req.params.idx, 1);

    // save the new dinosaurs to the data.json file
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));

    //redirect to the GET /dinosaurs route (index)
    res.redirect("/dinosaurs");
});

app.listen(4000, () => {
    console.log(`Listening on Port:4000!`);
});
