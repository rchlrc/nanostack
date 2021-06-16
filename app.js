const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/', (req, res) => {
	res.redirect('/thankyou');
});

app.get('/about', (req, res) => {
	res.render('about');
});

app.get('/thankyou', (req, res) => {
	res.render('thankyou', { name:req.cookies.name });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('This app is running on port' + port);
});