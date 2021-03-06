
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Campground = require('./models/campground')
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

app.set('view engine', "ejs");
app.set('views', path.join(__dirname, 'views'));

app.listen(3000, () => {
    console.log('Serving on port 3000');
})

app.get('/', (req, res) => {
    // res.send("Hello World!");
    res.render("home");
})

app.get('/makeCampground', async (req, res) => {
    const camp = new Campground({ title: 'My Backyard', description: "A really beautiful vacation spot available 24/7" });
    await camp.save();
    res.send(camp);
})