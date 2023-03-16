//entry file for the backend application; 
//register express
// register  package.json npm init -y
// npm install express

//to run the file -> node server.js in the terminal BUT on every change it has to be stopped and started again
// to run file on detected change-> nodemon -> npm install -g nodemon
//-> nodemon server.js in terminal
//inside package.json - "dev" : "nodemon server.js" -> runs nodemon on dev command in the interval on npm run dev


// npm install dotenv -> loads environment variables from env files inside the server file
require('dotenv').config()

//require the express package
const express = require('express')

//npm install mongoose -> Object Data Modeling -> wraps mongo with methods that read and write db docs, ensures a more strict data structure
const mongoose = require('mongoose') //connect to the db

//require the routes
const workoutRoutes = require('./routes/workouts')

//start up the epxress app 
const app = express()

//middleware to access the req object and then send data to the db
app.use(express.json()) //looks if the req has a body and attaches it to the req object

//register middleware- code that executes between getting the request and sending the response
//global middleware -> next functions is always invoced so that it goes to the next request
app.use((req, res, next) => {  // a function that will fire on every request
    console.log(req.path, req.method); // logging the requests that are comming in
    next()
})

//handler or controller
//react to get requests
//app.get('/', (req, res) => {  // receive the request and return the response
//res.json({ mssg: 'Welcome to the app' })  // send back a json string
//})

//use routes -> grabs the routes in the router and uses them in the app
app.use('/api/workouts', workoutRoutes) // fire a request only on the path /api/workouts/

//connect to db; async returns a promise
mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        //listen for requests at port 3000 once we have connected to the db successfully
        //store posrt in environment variable that are not visible in the code - for sensitive information
        //process.env.PORT pulls the hidden variable from the env file
        app.listen(process.env.PORT, () => {
            console.log(`connected to db and listening on port ${process.env.PORT}!`)
        })

    })
    .catch((error) => {
        console.log(error);
    })




