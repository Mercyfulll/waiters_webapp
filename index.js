import express from "express";
import {engine} from "express-handlebars";
import bodyParser from "body-parser";
import pgPromise from "pg-promise";


var app = express();
var pgp = pgPromise();

var connectionString = process.env.DATABASE_URL || 'postgres://ncmlcbqz:SXVviMgE6Vt3-ssTYfVB6Wsj42Tw4t0N@trumpet.db.elephantsql.com/ncmlcbqz?ssl=true'

var db = pgp(connectionString)

// use the express.static built-in middleware to serve static file 'css'
app.use(express.static(('public')))

// set and callback engine 
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get("/", async function(req,res){
    res.render("index")
})

app.post("/",async function(req,res){
    const waiters_Name = req.body.uName
    const daysOfTheWeek = req.body.daysOfWeek

    // await db.none(`INSERT INTO schedule (waiters_name) VALUES ($1)`,[waiters_Name])

    res.render("index")
})

app.post("/waiters/:username", async function(req,res){
    const waiterName = req.params.username

    res.render("admin")

})

app.get("/days",async function(req,res){
    res.render("admin")
})
const PORT = process.env.PORT || 3022

app.listen(PORT, function(){
    console.log('App starting on port', PORT);
})

