const express = require('express');

const app = express();

app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/', (req, res) => {
	collection.insertOne(req.body, (err, result) => {  
    if (err) return console.log(err)
    console.log('saved to database')
	res.redirect('/thankyou');
});

app.get('/about', (req, res) => {
	res.render('about');
});

app.get('/thankyou', (req, res) => {
	res.render('thankyou', { name:req.cookies.name });
});

const MongoClient = require('mongodb').MongoClient;

const CONNECTION_URL = "mongodb+srv://rachelrc:Mn6k7f*3@cluster0.frxw3.mongodb.net/piccadilly?retryWrites=true&w=majority";
const DATABASE_NAME = "piccadilly"; // you can change the database name
var database, collection;

MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
  if(error) throw error;

  database = client.db(DATABASE_NAME);
  collection = database.collection("newcollection"); // you can change the collection name

  // Start the application after the database connection is ready
  app.listen(port, () => {
    console.log('This app is running on port ' + port)
  });
});