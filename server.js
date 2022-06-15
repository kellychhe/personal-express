const express = require('express') //access express function
const app = express() // app is telling express function to run
const bodyParser = require('body-parser') //access body parser module
const MongoClient = require('mongodb').MongoClient //access mongodb
const {ObjectId} = require('mongodb') //gives access to _id in mongodb

let db 
require('dotenv').config()
const dbName = "game"; //name of database

app.listen(3000, () => { // listening on port 3000
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs') 
app.use(bodyParser.urlencoded({extended: true})) 
app.use(bodyParser.json()) 
app.use(express.static('public')) 

app.get('/', (req, res) => {
  db.collection('wordGame').find().toArray((err, result) => {
    if (err) return console.log(err) 
    res.render('index.ejs', {wordGame: result})
  })
})

app.post('/wordGame', (req, res) => { 
  db.collection('wordGame').insertOne({ word: req.body.word, guess: []}, (err, result) => { 
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.post('/guessLetter', (req, res) => { 
  db.collection('wordGame').updateOne({ _id: ObjectId(req.body.game) },
  {$push : {
    guess: req.body.guess
  }
  },  
  (err, result) => { 
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.delete('/wordGame', (req, res) => { // a delete request
  db.collection('wordGame').findOneAndDelete({_id: ObjectId(req.body._id)}, (err, result) => { // find matching name/message object in database and delete it
    if (err) return res.send(500, err)
    res.send('game deleted!')
  })
})