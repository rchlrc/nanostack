const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render('home');
});

app.get('/about', (req, res) => {
	res.render('about');
});

app.post('/', (req, res) => {
	res.render('home');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('This app is running on port' + port);
});