import express from "express";
import exphbs from 'express-handlebars';
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
var ehbs = exphbs.create();

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

// ehbs.handlebars.registerHelper('includes', function(arr, item) {
//     //Map the array of objects to an array of days
//     const days = arr.map(a => a.daysofweek);
//     //Check if the item is included in the array of days
//     return days.includes(item);
// });

// ehbs.handlebars.registerHelper('includes', function(arr, item) {
//     if (Array.isArray(arr)) {
//         // Use Array.some() to check if the item exists in the array of objects
//         return arr.some(obj => obj.day === item);
//     }
//     return false; // Return false if arr is not an array
// });



app.get("/",route.home)
// app.post("/",route.checkbox)
app.post("/",route.waiterPage)
app.post("/days",route.adminPageFunctionality)
app.get("/days",route.adminPage)
app.post("/admin",route.adminPageRemove)
app.post("/reset", route.reset)

const PORT = process.env.PORT || 3022

app.listen(PORT, function(){
    console.log('App starting on port', PORT);
})

