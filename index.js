const express = require('express');
const ejsLayouts = require('express-ejs-layouts');

const app = express();

// Middleware 
app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.listen(4000, () => {
    console.log(`Listening on Port:4000!`)
});