const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Pizza = require('./models/pizza');

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

mongoose.connect('', { useUnifiedTopology: true , useNewUrlParser: true})
    .then(()=> console.log("Connected to MongoDb"))
    .catch((err)=> console.error('Failed to connect to database', err.message));

app.get("/", (req,res)=>{
    
    Pizza.find().sort({createdAt: -1})
        .then((data)=>{
            res.render("index", {title: "Home", orders:data});
        })
        .catch((err)=>{
            console.log(err.message);
        });
});

app.get("/about", (req,res)=>{
    res.render("about", {title: "About"});
});

app.get("/orders", (req,res)=>{
    res.render("order", {title: "Order Pizza"});
});

app.post("/orders", (req,res)=>{
    const pizza = new Pizza(req.body);

        pizza.save()
        .then(()=> {
            res.redirect("/");
            console.log("Successfully placed Order");
        })
        .catch((err)=>{
            console.log("Error While Placing Order", err.message);
        });
 });

app.use((req,res)=>{
    res.render("404", {title: "Error Page"});
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
