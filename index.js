import express from "express";
import {engine} from "express-handlebars";
import bodyParser from "body-parser";
import pgPromise from "pg-promise";
import flash from "express-flash";
import session from "express-session";
import waiters from "./waiters.js";
import queries from "./services/database.js"; 
import routes from "./routes/routes.js";


var app = express();
var pgp = pgPromise();
var waiter = waiters();

var connectionString = process.env.DATABASE_URL || 'postgres://ncmlcbqz:SXVviMgE6Vt3-ssTYfVB6Wsj42Tw4t0N@trumpet.db.elephantsql.com/ncmlcbqz?ssl=true'

var db = pgp(connectionString)
var data = queries(db)
var route = routes(data, waiter)
// use the express.static built-in middleware to serve static file 'css'
app.use(express.static(('public')))

//use session to maintain data on the application
app.use(session({
    secret : 'This is a string',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

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

app.post("/",route.waiterPage)
app.post("/days",route.adminPageFunctionality)
app.get("/days",route.adminPage)
app.post("/admin",route.adminPageRemove)
app.post("/reset", route.reset)

const PORT = process.env.PORT || 3022

app.listen(PORT, function(){
    console.log('App starting on port', PORT);
})

