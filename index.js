import express from "express";
import {engine} from "express-handlebars";
import bodyParser from "body-parser";
import pgPromise from "pg-promise";
import flash from "express-flash";
import session from "express-session";


var app = express();
var pgp = pgPromise();

var connectionString = process.env.DATABASE_URL || 'postgres://ncmlcbqz:SXVviMgE6Vt3-ssTYfVB6Wsj42Tw4t0N@trumpet.db.elephantsql.com/ncmlcbqz?ssl=true'

var db = pgp(connectionString)

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

app.post("/",async function(req,res){
    const waiters_Name = req.body.uName       
    const daysOfTheWeek = req.body.daysOfWeek 
    // const checkNameExists = await db.manyOrNone('SELECT waiters_name FROM schedule WHERE waiters_name =$1',[waiters_Name]) 
    console.log(waiters_Name)
    console.log(daysOfTheWeek)
    
    if(waiters_Name && daysOfTheWeek){
    // Insert the waiter's name into the schedule table
     await db.one('INSERT INTO schedule (waiters_name) VALUES ($1) RETURNING id', [waiters_Name]);
     
    // const waiterId = waiterResult.id;

    // Insert the days into the schedule table and link to workdays table
    for (const dayOfWeek of daysOfTheWeek) {
      await db.none('INSERT INTO schedule (waiters_name, days_id) VALUES ($1, (SELECT id FROM workdays WHERE daysOfWeek = $2))', [waiters_Name, dayOfWeek]);
    }
        req.flash('success','Name and days added to schedule successfully')
        res.render('index')
    }
    // Redirect or respond as needed
    res.render('index');
  
})

app.post("/waiters/:username", async function(req,res){
    const waiterName = req.params.username

    res.render("admin")

})

app.get("/days",async function(req,res){
    const scheduled = await db.manyOrNone(` SELECT schedule.waiters_name, workdays.daysofweek FROM workdays JOIN schedule ON schedule.days_id = workdays.id`)
    

    res.render("admin", {scheduled})
})

app.post("/reset",async function(req,res){
    await db.none(' DELETE FROM schedule')
    res.render('admin')
})
const PORT = process.env.PORT || 3022

app.listen(PORT, function(){
    console.log('App starting on port', PORT);
})

