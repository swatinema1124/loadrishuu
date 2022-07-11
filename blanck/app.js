// Requiring express to handle routing
const express = require('express')

// Creating app
const app = express()

// Requiring mongoose to handle mongoDB Database
const mongoose = require('mongoose')

// Connecting to local MongoDB
mongoose.connect("mongodb://root:example@my_db_rishabh:27017/db?authSource=admin", {
  useNewUrlParser: true
});

// Creating visitor Schema to hold the
// count of visitors
const visitorSchema = new mongoose.Schema({
  name: String,
  count: Number
})

// Creating Visitor Table in visitCounterDB
const Visitor = mongoose.model("Visitor",visitorSchema)

// Get request to app root
app.get('/', async function(req,res){
  
  // Storing the records from the Visitor table
  let visitors = await Visitor.findOne({name: 'localhost'})

  // If the app is being visited first
  // time, so no records
  if(visitors == null) {
    
    // Creating a new default record
    const beginCount = new Visitor({
      name : 'localhost',
      count : 1
    })

    // Saving in the database
    beginCount.save()

    // Sending thee count of visitor to the browser
    res.send(`<h2>Counter: `+1+'</h2>')

    // Logging when the app or user is visited first time
    console.log("First visitor arrived")
  }
  else{
    
    // Incrementing the count of visitor by 1
    visitors.count += 1;

    // Saving to the database
    visitors.save()

    // Sending thee count of visitor to the browser
    res.send(`<h2>Container IP: ${req.headers.host}</h2><h2>Counter: `+visitors.count+'</h2>')

    // Logging the visitor count in the console
    console.log("visitor arrived: ",visitors.count)
  }
})

// Creating server to listen at localhost 3000
app.listen(3001,function(req,res){

  // Logging when the server has started
  console.log("listening to server 3001")
})

