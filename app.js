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